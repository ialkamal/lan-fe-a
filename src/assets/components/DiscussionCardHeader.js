import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link, Switch, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import {
  fetchPost,
} from '../../store/actions';

import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { Space, Divider, Menu, Dropdown, Layout, Typography } from 'antd';

import { CheckIfModOrAdmin } from '../CheckIfModOrAdmin';

import { PrivateRoute } from '../../utils/privateRoute';
import { FlagChip } from '../FlagChip';
import UserFlaggingModal from '../UserFlaggingModal';
import FlagManagerModal from '../FlagManagerModal';
import DiscussionDrawer from '../DiscussionDrawer';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DiscussionCardHeader = (props) => {
  const { path, url } = useRouteMatch();
  const {Header, Content} = Layout;
  const [showModal, setShowModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);



  const dropdownMenu = (
    <Menu>
      <Menu.Item key="0">
        <a>
          <PushpinOutlined /> Pin
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={() => setShowFlagModal(true)}>
          <FlagOutlined /> Flag Discussion
        </a>
      </Menu.Item>

      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Divider />
      )}

      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Item key="3">
          <a onClick={() => setShowModal(true)}>
            <FlagOutlined /> Moderate
          </a>
        </Menu.Item>
      )}
    </Menu>
  );



  return(
    <>
      <div>
        <span>
          <Space>
            Posted by
            <Link to={`/user/${props.currentPost.user_id}`} >
              {props.currentPost.display_name}
            </Link>
            <Divider type="vertical" />
            {moment(props.currentPost.created_at).fromNow()}
          </Space>
        </span>
        <span>
          <Divider type="vertical" />
          <IconText
            icon={ArrowUpOutlined}
            text={props.currentPost.likes}
            key="like-or-upvote"
          />
        </span>
        <span>
          <Divider type="vertical" />
          <IconText
            icon={MessageOutlined}
            text={props.currentPost.comments}
            key="list-vertical-message"
          />
        </span>
        <span>
          {CheckIfModOrAdmin(props.user) && (
            <>
              <Divider type="vertical" />
              <Link to={`${url}/discussion/${props.currentPost.id}?view=flagged`}>
                <FlagChip
                  flags={`${props.discussion.flags.length}`}
                  commentsFlagged={`${props.discussion.flaggedComments.length}`}
                />
              </Link>
            </>
          )}
        </span>
        <span>
          <Divider type="vertical" />
          <Dropdown overlay={dropdownMenu} trigger={['click']} style={{align: 'right'}}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </span>
      </div>
      <Layout>
        <Header
          style={{
            padding: '0px 0px',
            display: 'flex',
            justifyContent: 'flex-start',
            height: 'auto',
          }}
        ></Header>
      <Content style={{ background: '#fff' }}>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              alignSelf: 'flex-start',
            }}
            >
            <Typography.Title level={3}>
              {props.currentPost.title}
            </Typography.Title>
            <Typography.Text>{props.currentPost.description}</Typography.Text>
          </div>
        </Content>
      </Layout>
      

      <FlagManagerModal
        visible={showModal}
        setVisible={setShowModal}
        flagsData={props.currentPost.flags ? props.currentPost.flags : undefined}
        discussionID={props.currentPost.id}
      />

      <UserFlaggingModal
        visible={showFlagModal}
        setVisible={setShowFlagModal}
        discussionID={props.currentPost.id}
      />

      <Switch>
        <PrivateRoute
          path={`${path}/discussion/:discussionID`}
          component={DiscussionDrawer}
        />
      </Switch>   
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentPost: state.currentPost,
  };
};

export default connect(mapStateToProps, {
  fetchPost,
})(DiscussionCardHeader);
