import React from 'react';
import { Menu } from 'antd';
import {EditOutlined } from '@ant-design/icons';

const Toolbar = ({ onSelectTool}) => {
  const items = [
    {
      label: 'Draw',
      key: 'draw',
      icon: <EditOutlined />,
      children: [
        {
          type: 'group',
          label: 'shapes',
          children: [
            {
              label: 'Rectangle',
              key: 'rectangle',
            },
            {
              label: 'Line',
              key: 'line',
            },
            {
              label: 'Circle',
              key: 'circle',
            },
          ],
        },
      ],
    },
    {
      label: 'Select',
      key: 'select',
      icon: <EditOutlined />,
      children: [
        {
          type: 'group',
          label: 'options',
          children: [
            {
              label: 'Drag',
              key: 'drag',
            },
            {
              label: 'Delete',
              key: 'delete',
            },
            {
              label: 'Resize <',
              key: 'resize',
            },
          ],
        },
      ],
    },
  ];

  return <Menu onClick={onSelectTool} mode="horizontal" items={items} />;
};

export default Toolbar;
