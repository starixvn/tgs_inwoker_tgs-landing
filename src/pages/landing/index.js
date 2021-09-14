import { useEffect } from "react";
import styled from "styled-components";
import BackgroundJPG from "../../assets/images/background.jpg";
import LanguageChanger from "../../component/languageChanger";
import languageChanger from "../../component/languageChanger";
import breakpoint from "../../config/breakpoints";
import config from "../../config/config";
import i18n from "../../config/i18n";
import { AppHistory } from "../../config/router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  @media (${breakpoint.mobile}) {
    justify-content: space-between;
  }
`;

const Background = styled.div`
  background: url(${BackgroundJPG}) no-repeat center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
`;

const LogoHolder = styled.img`
  width: 200px;

  @media (${breakpoint.mobile}) {
    margin-top: 10vh;
  }
`;

const CountryHolder = styled.div`
  display: flex;
  @media (${breakpoint.mobile}) {
    display: grid;
    grid-template-columns: auto auto;
    padding: 0px;
  }
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  cursor: pointer;

  @media (${breakpoint.mobile}) {
    padding: 20px;
  }
`;

const CountryFlag = styled.img`
  width: 200px;
  height: auto;

  @media (${breakpoint.mobile}) {
    width: 100px;
  }
`;

const CountryName = styled.div`
  font-style: italic;
  color: white;
  font-weight: bold;
  font-size: 24px;

  @media (${breakpoint.mobile}) {
    margin-top: 20px;
    font-size: 18px;
  }
`;

const CountryFlagHolder = styled.div`
  width: 250px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (${breakpoint.mobile}) {
    width: auto;
    height: auto;
  }

  :hover {
    ${CountryFlag} {
      transform: scale(1.4);
      transition: transform 0.5s;
    }
  }
`;

const Description = styled.div`
  font-size: 32px;
  background: -webkit-linear-gradient(#fff, #eed04c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  padding: 30px 0px;
  text-align: center;

  @media (${breakpoint.mobile}) {
    font-size: 20px;

    padding: 10px 0px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  @media (${breakpoint.mobile}) {
    display: grid;
    grid-template-columns: auto auto;
    padding-bottom: 20px;
  }
`;

const FooterIcon = styled.div`
  height: 50px;
  width: 50px;
  background-color: #8e8f90;

  mask: url(${({ icon }) => icon}) no-repeat center / contain;
`;

const FooterText = styled.div`
  color: #8e8f90;
  width: 100px;
  margin-left: 10px;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;

  @media (${breakpoint.mobile}) {
    ${FooterIcon} {
      height: 30px;
      width: 30px;
    }
    ${FooterText} {
      font-size: 12px;
    }
  }
`;

const LanguageChangerHolder = styled.div`
  position: fixed;
  right: 10px;
  top: 20px;
  z-index: 1;
`;

function App() {
  const country = [
    { flag: "my", name: i18n.t("country.my"), to: 0 },
    { flag: "th", name: i18n.t("country.th"), to: 1 },
  ];

  const footer = [
    { icon: "support", text: i18n.t("footer.support") },
    { icon: "trusted", text: i18n.t("footer.trusted") },
    { icon: "fast", text: i18n.t("footer.fast") },
  ];

  function goto(params) {
    window.location.href = config.urls[params];
  }

  useEffect(() => {
    AppHistory.push("/" + i18n.language);
  }, []);

  return (
    <Wrapper>
      <LanguageChangerHolder>
        <LanguageChanger />
      </LanguageChangerHolder>
      <Background className="App" />

      <LogoHolder
        src={process.env.PUBLIC_URL + "/assets/logo/" + config.brand + ".png"}
      />
      <div>
        <CountryHolder>
          {country.map((data, index) => {
            return (
              <CountryContainer
                key={index}
                onClick={() => {
                  goto(data.to);
                }}
              >
                <CountryFlagHolder>
                  <CountryFlag
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/country/" +
                      data.flag +
                      ".png"
                    }
                  />
                </CountryFlagHolder>

                <CountryName>{data.name}</CountryName>
              </CountryContainer>
            );
          })}
        </CountryHolder>
        <Description>{i18n.t("country.title")}</Description>
      </div>
      <Footer>
        {footer.map((data, index) => {
          return (
            <FooterItem key={index}>
              <FooterIcon
                icon={
                  process.env.PUBLIC_URL +
                  "/assets/footer/" +
                  data.icon +
                  ".png"
                }
              />
              <FooterText>{data.text}</FooterText>
            </FooterItem>
          );
        })}
      </Footer>
    </Wrapper>
  );
}

export default App;
