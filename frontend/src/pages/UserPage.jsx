import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '../components/Post'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'

function UserPage() {
  const { loading, user } = useGetUserProfile()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const { username } = useParams()
  const [fetchPosts, setFetchPosts] = useState(true)

  const showToast = useShowToast()
  const token = localStorage.getItem('jwt')
 

  useEffect(() => {
    const getPosts = async () => {
      setFetchPosts(true)
      try {
        const res = await fetch(`https://threadsclone-project.onrender.com/api/posts/user/${username}`, {
          headers: {
            'Authorization': JSON.parse(token)
          },
        })
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }
        setPosts(data)
      } catch (err) {
        showToast('Error', err, 'error')
      } finally {
        setFetchPosts(false)
      }
    }

    getPosts()
  }, [username, showToast, setPosts, token])

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size='xl' />
      </Flex>
    );
  }
  if (!user && !loading)
    return <h1>User not found</h1>
  return (
    <>
      <UserHeader user={user} />
      {!fetchPosts && posts.length === 0 && <h1>No posts yet.</h1>}
      {fetchPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {posts.map((post) =>
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      )}
    </>
  )
}

export default UserPage