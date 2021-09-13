import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import i18n from "../../config/i18n";
import { AppHistory } from "../../config/router";

const LanguageHolder = styled.div`
  min-height: 10px;
  min-width: 10px;

  position: relative;
`;

const LanguageDropdown = styled.div`
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0px;
  background: #fff;
  padding: 5px 0px;
`;

const LanguageButton = styled.div`
  color: white;
  padding: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const SwitchLanguage = styled.div`
  padding: 10px 20px 10px 20px;
  min-width: 120px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const Flag = styled.img`
  width: 30px;
  height: 20px;
  margin-right: 10px;
`;

const LanguageChanger = () => {
  const [open, setOpen] = useState(false);
  const languageBtnRef = useRef();

  const languages = [
    {
      language: "en-US",
      name: "English",
    },

    {
      language: "zh-CN",
      name: "简体中文",
    },
    {
      language: "zh-TW",
      name: "繁體中文",
    },
  ];

  return (
    <LanguageHolder>
      <LanguageButton
        ref={languageBtnRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Flag
          src={
            process.env.PUBLIC_URL +
            "/assets/language/" +
            i18n.language +
            ".png"
          }
        />
      </LanguageButton>
      {open && (
        <LanguageDropdown gap={languageBtnRef.current}>
          {languages
            .filter((a) => {
              return a.language !== i18n.language;
            })
            .map((data, index) => {
              return (
                <SwitchLanguage
                  key={index}
                  onClick={() => {
                    AppHistory.push(data.language);
                    i18n.changeLanguage(data.language);
                    setOpen(!open);
                  }}
                >
                  <Flag
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/language/" +
                      data.language +
                      ".png"
                    }
                  />

                  <div>{data.name}</div>
                </SwitchLanguage>
              );
            })}
        </LanguageDropdown>
      )}
    </LanguageHolder>
  );
};

export default LanguageChanger;
