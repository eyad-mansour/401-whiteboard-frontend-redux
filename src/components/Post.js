import React, {useContext, useEffect} from 'react';
// import {Card} from 'react-bootstrap';
import AddPost from './Add-post-form';
import AddComment from './Add-comment-form';
import {PostContext} from '../context/PostContext';
import {authContext} from '../context/AuthContext';
import cookies from 'react-cookies';
import {VStack, HStack, Box, Button, Spacer} from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@chakra-ui/react';

export default function Post(props) {
  const {
    posts,
    getAllPost,
    deleteOneComment,
    deleteOnePost,
    showPostComponent,
    addPost,
  } = useContext(PostContext);
  const {role, isAuth, capabilities, userAbility} = useContext(authContext);

  useEffect(() => {
    // setRole(cookies.load('role'));
    getAllPost();
  }, []);
  return (
    <HStack m='2em'>
      <VStack>
        <AddPost />
        {showPostComponent &&
          posts.map((post, idx) => {
            return (
              <div key={idx}>
                <Box
                  borderWidth='3px'
                  borderColor='gray.200'
                  borderRadius='lg'
                  padding='4'
                  w='100%'
                >
                  <Card>
                    <CardBody>
                      <VStack>
                        <CardHeader
                          // size='4xl'
                          noOfLines={1}
                          mb='30'
                          bgGradient='(warning.100)'
                          bgClip='text'
                          bgColor='blue.500'
                        >
                          {post.postName}
                        </CardHeader>
                      </VStack>

                      {userAbility(
                        cookies.load('capabilities'),
                        post.userID
                      ) ? (
                        <VStack>
                          <Button
                            colorScheme='red'
                            isRound='true'
                            onClick={() => deleteOnePost(post)}
                          >
                            delete
                          </Button>
                        </VStack>
                      ) : (
                        <></>
                      )}
                    </CardBody>

                    <AddComment commentID={post.id} />

                    {post.Comments.map((comment, idx) => {
                      return (
                        <VStack p='2em'>
                          <div key={idx}>
                            {comment.commentName}
                            {userAbility(
                              cookies.load('capabilities'),
                              post.userID
                            ) ? (
                              <Button
                                colorScheme='red'
                                isRound='true'
                                onClick={() => deleteOnePost(post)}
                              >
                                delete
                              </Button>
                            ) : (
                              <></>
                            )}
                          </div>
                          <Divider />
                        </VStack>
                      );
                    })}
                  </Card>
                </Box>
              </div>
            );
          })}
      </VStack>
    </HStack>
  );
}
