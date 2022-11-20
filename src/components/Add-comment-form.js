import React, {useContext} from 'react';
import axios from 'axios';
import cookies from 'react-cookies';
import {PostContext} from '../context/PostContext';
import {HStack, Input, Button, useToast, Badge} from '@chakra-ui/react';

export default function AddComment(props) {
  const {getAllPost} = useContext(PostContext);

  const addComment = async (e) => {
    e.preventDefault();
    const data = {
      commentName: e.target.commentName.value,
      commentID: props.commentID,
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND}/comment`, data, {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`,
        },
      })
      .then(() => {
        getAllPost();
      });
  };

  return (
    <>
      <Badge colorScheme='cyan' p='1' borderRadius='lg'>
        add comment
      </Badge>
      <form onSubmit={addComment}>
        <Input
          name='commentName'
          id='commentName'
          type='text'
          placeholder='add comment...'
        />
        <Input type='submit' />
      </form>
    </>
  );
}
