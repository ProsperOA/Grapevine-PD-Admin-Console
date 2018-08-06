import * as React from 'react';
import { Input } from 'antd';

interface InputProps {
  placeholder?: string;
  size?: 'small' | 'large';
  enterButton?: string;
  onSearch: (value: string) => any;
}

export default (props: InputProps): JSX.Element => (
  <Input.Search
    placeholder={props.placeholder || 'Search'}
    enterButton={props.enterButton || 'Search'}
    size={props.size || 'default'}
    onSearch={(value: string) => props.onSearch(value)} />
);