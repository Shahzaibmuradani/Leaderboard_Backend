import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import {loadUser} from '../../actions/auth';
import PostItem from './PostItem';

const allPosts = ({
  navigation,
  getPosts,
  post: {posts},
  loadUser,
  auth: {loading, user},
}) => {
  useEffect(() => {
    loadUser();
    getPosts();
  }, [getPosts, loadUser]);

  return (
    <>
      {loading && user === null ? (
        <Spinner />
      ) : (
        posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            user={user}
            navigation={navigation}
          />
        ))
      )}
    </>
  );
};

allPosts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {loadUser, getPosts})(allPosts);
