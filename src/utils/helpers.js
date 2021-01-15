// Copied from https://github.com/uidotdev/react-course-curriculum/blob/solution/app/utils/helpers.js
export function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
