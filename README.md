# Anissia-iCalendar

Anissia-iCalendar 는 [anissia의 스케쥴](https://anissia.net/schedule)을 iCalendar 형식으로 배포합니다.

[Anissia API](https://github.com/anissia-net/document/blob/main/api_anime_schdule.md) 를 사용합니다.

## 세부사항

- 당일로부터 1주일간의 달력이 생성됩니다.
- 6시간 주기로 갱신합니다.
- 결방인 경우 목록에서 제외됩니다.
- 일정 종료 시각은 실제 방영 시각과는 무관하게 무조건 시작 시각으로부터 30분 뒤입니다.

## 사용법

다음의 URL을 캘린더에 추가하세요.

```
https://raw.githubusercontent.com/906bc906/anissia-icalendar/ical/anissia-icalendar.ics
```

ics 파일은 `ical` 브랜치에서 확인할 수 있습니다.

## 빌드

```bash
npm ci
node app
```

이후 정상적으로 실행된 경우 `output/anissia-icalendar.ics` 에 생성됩니다.