import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle,
  getInfoFromBDInfo,
  getSourceFromTitle,
} from '../common';

export default async () => {
  // const torrentId = getUrlParam('id');
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const typeText = $('td.heading:contains(Type)').eq(0).next().text();
  const tags: (string | null)[] = [];
  $('td.heading:contains(Tags)').eq(0).next().children().each((_, child) => {
    tags.push(child.textContent);
  });
  const size = $('td.heading:contains(Size)').eq(0).next().text()
    .replace(/([0-9,]+) bytes/i, (_, size) => size.replace(/,/g, ''));
  const title = $('h1').eq(0).text();
  const imdbNumber = $('span:contains("IMDB id:") a').text();

  const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFromBDInfo(TORRENT_INFO.mediaInfo);
  TORRENT_INFO.size = parseInt(size, 10);
  // const isMovie = typeText !== 'TV-Series';
  // const isBluray = TORRENT_INFO.videoType.match(/bluray/i);

  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.mediaInfo = $('td[style~=dotted]').text();

  TORRENT_INFO.year = $('span.gr_hsep:contains(Year)').text().replace('Year: ', '').trim();
  TORRENT_INFO.movieName = $('div.gr_tdsep h1:first-child').text();
  TORRENT_INFO.imdbUrl = `https://www.imdb.com/title/tt${imdbNumber}/`;
  TORRENT_INFO.category = typeText;
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.videoType = tags.includes('Blu-ray') ? 'bluray' : 'dvd';
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = mediaTags;
};

/* // 获取截图
const getImages = async (description: string) => {
  const screenshots = await getScreenshotsFromBBCode(description);
  return screenshots;
}; */
