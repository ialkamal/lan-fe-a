import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar, Modal } from 'antd';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import { FlagChip } from './FlagChip';

const DiscussionCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="discussion-card">
      <Card
        hoverable="true"
        onClick={props.onClick}
        style={{ margin: '30px 0px' }}
        actions={[
          <SettingOutlined key="setting" />,
          //! vvv Reformat to flag chip that routes you to
          //! vvv  discussion with view by set to "flagged"
          <EditOutlined
            key="edit"
            onClick={() => {
              setShowModal(true);
            }}
          />,
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => props.setFlaggingModalVisibility(true)}
          />,
        ]}
        title={
          <Card.Meta
            avatar={<Avatar src={props.discussion.profile_picture} />}
            title={props.discussion.title}
          />
        }
      >
        <p>{props.discussion.description}</p>
        <FlagChip flagged="10" comments="5" />
        <FlagManagerModal visible={showModal} setVisible={setShowModal} />
        {/* //!Change below prop to discussionId and fix in UserFlaggingModal Component */}
        <UserFlaggingModal postId={props.discussion.id} />
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
  };
};

export default connect(mapStateToProps, { setFlaggingModalVisibility })(
  DiscussionCard
);
