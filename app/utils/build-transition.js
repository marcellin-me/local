
export function isValidLink(link) {
  return typeof input === 'string' && (link.search('https://') === 0 || link.search('http://') === 0);
}
export function isValidRoute(link) {
  // let app = getOwner(this);
  // console.log(app);
  return typeof input === 'string' && (link.search('https://') < 0); // @TODO
}
// our utility function allows us to
// 1. visit external url if user provides valid url
// 2. visit a page in our app if user provides a valid route's path name

export default function buildTransition(route, input) {
  if (isValidLink(input)) {
    return { run: () => window.location.replace(input), valid: true };
  } else if(isValidRoute(input)) {
    return { run: () => route.transitionTo(input), valid: true };
  } else {
    return { run: () => {throw new Error(input)}, valid: false };
  }
}