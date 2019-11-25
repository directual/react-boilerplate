import React from 'react';
import { Button, Select } from 'storybook-directual';

import './ActionPanel.scss';


const appFilterOptions = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
];

const ActionPanel = () => {
  const initialValue = '';
  const changeTheme = (theme: string) => () => {
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('data-theme', theme);
  };
  return (
    <div className="action-panel">
      <Button
        type="accent"
        className="action-panel__control"
        onClick={changeTheme('')}
      >
        Default Theme
      </Button>
      <Button
        type="accent"
        className="action-panel__control"
        onClick={changeTheme('dark')}
      >
        Dark Theme
      </Button>
      <Button
        type="accent"
        className="action-panel__control"
        onClick={changeTheme('acid')}
      >
        Acid Theme
      </Button>

      <div className="app-filter-select action-panel__control">
        <Select
          placeholder="Hello there"
          selected={initialValue}
          options={appFilterOptions}
          onChange={(key: string) => console.warn('key::::', key)}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
