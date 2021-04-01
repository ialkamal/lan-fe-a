import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';
import { FlagOutlined, PushpinOutlined } from '@ant-design/icons';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';

const PopoverContent = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <List>
      <List.Item>
        <Link>
          <Button
            style={{ background: 'red' }} // connect these colours with global stylesheets
            icon={<PushpinOutlined />}
            type="text"
          >
            Pin
          </Button>
          <UserFlaggingModal />
        </Link>
      </List.Item>
      <List.Item>
        <Link>
          <Button
            style={{ background: 'yellow' }} // connect these colours with global stylesheets
            onClick={() => props.setFlaggingModalVisibility(true)}
            icon={<FlagOutlined />}
            type="text"
          >
            Flag
          </Button>
        </Link>
      </List.Item>
      <List.Item>
        <Link>
          <Button
            style={{ background: 'Blue' }} // connect these colours with global stylesheets
            onClick={() => setShowModal(true)}
            icon={<FlagOutlined />}
            type="text"
          >
            Mod
          </Button>
        </Link>
        <FlagManagerModal
          visible={showModal}
          setVisible={setShowModal}
          flagsData={props.discussion.flags || null}
          discussionID={props.discussion.id}
        />
      </List.Item>
    </List>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    discussion: state.posts,
  };
};
export default connect(mapStateToProps, { setFlaggingModalVisibility })(
  PopoverContent
);
