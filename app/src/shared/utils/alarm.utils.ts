export function sendRegisteredKeywordIncludeContentCreatedAlarm(
  type: string,
  id: number,
  author: string,
  keyword: string,
) {
  console.log(
    'Send registered keyword created alarm to author(%s), type(%s), id(%s), keyword(%s)',
    author,
    type,
    id,
    keyword,
  );
}
