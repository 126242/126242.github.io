import { readdir, stat as _stat, readFile } from 'fs/promises'
import { writeJSON } from 'fs-extra'
import { resolve } from 'path'
import { load } from 'js-yaml'
import moment from 'moment'
import { red } from 'chalk'

const articlePath = '../docs'
const excludeDirs = ['node_modules', '.vitepress', 'public']
const pagesPath = './.vitepress/pages.json'

/**
 * ��ȡ��Ҫ�����Ŀ¼�б�
 * 1. ��ȡ docs Ŀ¼�µ�������Ŀ
 * 2. ���˵��ų�Ŀ¼��node_modules �ȣ�
 * 3. ɸѡ��ʵ�ʴ��ڵ�Ŀ¼
 */
const getTargetDirs = async () => {
  const allDirs = await readdir(articlePath)
  const dirsStatPromiseArr = []
  const dirsPathArr = []
  allDirs.forEach((dir) => {
    if (excludeDirs.includes(dir)) return
    const pathWay = resolve(articlePath, dir)
    dirsStatPromiseArr.push(_stat(pathWay))
    dirsPathArr.push(pathWay)
  })
  const dirsStat = await Promise.all(dirsStatPromiseArr)
  const targetDirs = []
  dirsStat.forEach((stat, index) => {
    if (stat.isDirectory()) {
      targetDirs.push(dirsPathArr[index])
    }
  })
  return targetDirs
}

/**
 * �ݹ��ȡָ��·�������� .md �ļ�
 * @param {string} pathWay - Ҫɨ���Ŀ¼·��
 * @returns {Promise<Array>} �������� .md �ļ�����·��������
 */
const getAllMdFiles = async (pathWay) => {
  const mdFileArr = []
  const dirs = await readdir(pathWay)
  const statPromiseArr = []
  const dirsPathArr = []
  dirs.forEach((dir) => {
    statPromiseArr.push(_stat(resolve(pathWay, dir)))
    dirsPathArr.push(resolve(pathWay, dir))
  })
  const statArr = await Promise.all(statPromiseArr)
  for (let i = 0; i < statArr.length; i++) {
    if (statArr[i].isDirectory()) {
      mdFileArr.push(...(await getAllMdFiles(dirsPathArr[i])))
    } else {
      dirs[i].endsWith('.md') && mdFileArr.push(dirsPathArr[i])
    }
  }
  return mdFileArr
}

// ƥ�� YAML frontmatter ��������ʽ��ʹ�� dotall ģʽƥ��������ݣ�
const yamlRegExp = /---(.*?)---/s

/**
 * ���� Markdown �ļ����ݲ���ȡԪ����
 * @param {string} pathWay - �ļ�����·��
 * @returns {Promise<Object|boolean>} ����Ԫ���ݵĶ��󣨲������������� false��
 */
const getContent = async (pathWay) => {
  const content = await readFile(pathWay, 'utf-8')
  const yamlArr = yamlRegExp.exec(content)
  if (!yamlArr || !yamlArr[1]) return false
  const yamlObj = load(yamlArr[1])
  if (!yamlObj.date && !yamlObj.categories && !yamlObj.tags) return false
  yamlObj.link = pathWay.replace(resolve(articlePath), '').replaceAll('\\', '/').replace('.md', '')
  if (yamlObj.date) yamlObj.timestamp = moment(yamlObj.date).valueOf()
  return yamlObj
  // �����߼�˵����
  // 1. ������� date/categories/tags �е�����һ���ֶ�
  // 2. �Զ�������������·����ת��Ϊ UNIX ���·����
  // 3. ������ת��Ϊʱ�����������
}

/**
 * ������������ҳ�����ݲ�д�� JSON �ļ�
 * �������̣�
 * 1. ��ȡ����Ŀ��Ŀ¼
 * 2. �ݹ�������� Markdown �ļ�
 * 3. ���н����ļ�Ԫ����
 * 4. ������Ч���ݲ�д���ļ�
 * @returns {Promise<Array>} ��������ҳ��Ԫ���ݵ�����
 */
const getPages = async () => {
  console.log(red('���ڽ��� pages...'))
  const targetDirs = await getTargetDirs()
  const mdFilePromiseArr = []
  targetDirs.forEach((pathWay) => {
    mdFilePromiseArr.push(getAllMdFiles(pathWay))
  })
  let mdFileArr = await Promise.all(mdFilePromiseArr)
  mdFileArr = mdFileArr.flat(Infinity)
  const infoPromiseArr = []
  mdFileArr.forEach((filePath) => {
    infoPromiseArr.push(getContent(filePath))
  })
  const infoArr = await Promise.all(infoPromiseArr)
  const pages = []
  infoArr.forEach((info) => {
    if (!info) return
    pages.push(info)
  })
  await writeJSON(resolve(pagesPath, './pages.json'), pages)
  console.log(red('pages �������, ��ʼ����'))
  return pages
}

export default getPages