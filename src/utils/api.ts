// Copied from https://github.com/uidotdev/react-course-curriculum/blob/solution/app/utils/api.js

import { PostType } from '../models/PostType'
import { Post } from '../models/Post'
import { User } from '../models/User'
import { Comment } from '../models/Comment'

const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

function removeDead(items: Post[]): Post[]
function removeDead(items: Comment[]): Comment[]
function removeDead(items: (Post | Comment)[]): (Post | Comment)[] {
  return items.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted(items: Post[]): Post[]
function removeDeleted(items: Comment[]): Comment[]
function removeDeleted(items: (Post | Comment)[]): (Post | Comment)[] {
  return items.filter(({ deleted }) => deleted !== true)
}

function onlyComments(posts: (Post | Comment)[]): Comment[] {
  return posts.filter(({ type }) => type === 'comment') as Comment[]
}

function onlyPosts(posts: (Post | Comment)[]): Post[] {
  return posts.filter(({ type }) => type === 'story') as Post[]
}

export function fetchItem(id: string | number): Promise<Post | Comment> {
  return fetch(`${api}/item/${id}${json}`).then((res) => res.json())
}

export function fetchComments(ids: number[]): Promise<Comment[]> {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => comments as Comment[])
    .then((comments: Comment[]) =>
      removeDeleted(onlyComments(removeDead(comments)))
    )
}

export function fetchMainPosts(type: PostType): Promise<Post[]> {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 50)
    })
    .then((ids: number[]) => Promise.all(ids.map(fetchItem)))
    .then((posts) => posts as Post[])
    .then((posts: Post[]) => removeDeleted(onlyPosts(removeDead(posts))))
}

export function fetchUser(id: string): Promise<User> {
  return fetch(`${api}/user/${id}${json}`).then((res) => res.json())
}

export function fetchPosts(ids: number[]): Promise<Post[]> {
  return Promise.all(ids.map(fetchItem))
    .then((posts) => posts as Post[])
    .then((posts: Post[]) => removeDeleted(onlyPosts(removeDead(posts))))
}
