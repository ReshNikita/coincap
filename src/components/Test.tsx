import { useState } from "react";
import { ConfigProvider, theme, Button, Card } from "antd";

export const Test = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode(previousValue => !previousValue);
  };
  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Card style={{ width: "max-content" }}>
          <Button onClick={handleClick}>
            Change Theme to {isDarkMode ? "Light" : "Dark"}
          </Button>
        </Card>
      </ConfigProvider>
    </div>
  );
};
