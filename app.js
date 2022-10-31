const ical = require('ical-generator');
const fs = require('fs/promises');
const axios = require('axios');
const { DateTime } = require('luxon');
const tz = require('@touch4it/ical-timezones')

async function generateICal() {
  const cal = initICal();
  const list = await fetchAnime();
  attachEvents(cal, list);

  await fs.mkdir("./output", {recursive: true});
  await cal.save('./output/anissia-icalendar.ics')
}

function initICal() {
  const cal = ical({
    name: "anissia",
    prodId: "//906bc906//anissia-icalendar//KR",
  });
  cal.timezone({
    name: "Asia/Seoul",
    generator: tz.getVtimezoneComponent
  });
  return cal;
}

async function fetchAnime(){
  //https://github.com/anissia-net/document/blob/main/api_anime_schdule.md
  const resultPromises = [];
  for (let i=0; i<=6; i++){
    resultPromises.push(axios.get(`https://anissia.net/api/anime/schedule/${i}`))
  }
  const resultRawRes = await Promise.all(resultPromises)
  return resultRawRes.map((day) => day.data);
}

async function _fetchAnime(){
  console.log("WARN: You are using mock API fetch");
  return JSON.parse(await fs.readFile("./saved-list"));
}

function attachEvents(cal, list) {
  const dtNow = DateTime.now().setZone('Asia/Seoul');
  for (let daydiff = 0; daydiff < 7; daydiff++) {
    const dtTarget = dtNow.plus({day: daydiff});
    const dtTargetObj = dtTarget.toObject();
    list[dtTarget.weekday % 7].forEach((anime) => {
      if (anime.status === "ON"
      && DateTime.fromISO(anime.startDate).setZone('Asia/Seoul') <= dtTarget
      && (anime.endDate === "" || DateTime.fromISO(anime.endDate).setZone('Asia/Seoul') >= dtTarget)) {
        const dtStart = DateTime.fromObject({
          ...dtTargetObj,
          hour: parseInt(anime.time.substring(0, 2)),
          minute: parseInt(anime.time.substring(3, 5)),
          second: 0,
          millisecond: 0
        }).setZone('Asia/Seoul');

        cal.createEvent({
          start: dtStart,
          end: dtStart.plus({minute: 30}),
          summary: anime.subject,
        })
      }
    })
  }
}



//------------
(
  async()=>await generateICal()
)();