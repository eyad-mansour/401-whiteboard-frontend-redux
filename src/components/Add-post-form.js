import React, {useContext} from 'react';
import {PostContext} from '../context/PostContext';
import {HStack, Input, Button, useToast, Badge, Center} from '@chakra-ui/react';

export default function AddPost() {
  const {addPost} = useContext(PostContext);

  return (
    <>
      <Center>
        <Badge colorScheme='cyan' p='1' borderRadius='lg'>
          add post
        </Badge>
      </Center>
      <form onSubmit={addPost}>
        <Input name='postName' type='text' placeholder='add post..' />
        <Input type='submit' />
      </form>
    </>
  );
}
