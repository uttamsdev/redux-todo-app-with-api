export function getRandomUID() {
    return 'uid-' + Math.random().toString(36).substr(2, 9);
}