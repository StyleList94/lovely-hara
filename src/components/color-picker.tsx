import { Code, Input } from '@nextui-org/react';

const ColorPicker = () => (
  <div>
    <h2>Color Picker</h2>
    <div>
      <Input placeholder="hex or rgb" />
    </div>
    <div>
      <div className="w-5 h-5 rounded bg-orange-500" />
      <Code>#FFFFFF</Code>
      <Code>#ffffff</Code>
      <Code>rgb(31 120 50)</Code>
      <Code>hsl(120deg 75% 25%)</Code>
    </div>
  </div>
);

export default ColorPicker;
