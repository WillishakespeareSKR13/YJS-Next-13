import {
  AtomButton,
  AtomText,
  AtomWrapper,
  css,
  useTheme,
} from "@stacklycore/ui";
import Header from "../components/Header";
import WrapperComponent from "../components/WrapperComponent";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { socketAtom } from "../jotai/socket";
import { inputAtom } from "../jotai/input";
import { statusAtom } from "../jotai/status";
import { clientsAtom } from "../jotai/clients";
import { docAtom } from "../jotai/doc";
import config from "../config";

const ContainerCSS = css`
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PageIndex = () => {
  const { key, toggle } = useTheme();
  const canvas = useRef(null);
  const [socket, setSocket] = useAtom(socketAtom);
  const [input, setInput] = useAtom(inputAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [clients, setClients] = useAtom(clientsAtom);
  const [doc, setDoc] = useAtom(docAtom);

  console.log(config);

  useEffect(() => {
    if (!doc) {
      console.log("setting doc");
      const _doc = new Y.Doc();
      const yMap = _doc.getMap("data");
      if (!yMap.has("input")) {
        yMap.observe((event, transaction) => {
          setInput(yMap.get("input") as string);
        });
      }
      setDoc(_doc);
    }
  }, [doc]);

  useEffect(() => {
    if (!!doc && !socket) {
      console.log("setting providers");
      fetch(`${config?.URL}`);
      const socketIOProvider = new SocketIOProvider(
        `${config?.WS_URL}`,
        "testing-doc",
        doc,
        {
          autoConnect: true,
          // disableBc: true,
          // auth: { token: 'valid-token' },
        }
      );
      socketIOProvider.awareness.on("change", () =>
        setClients(
          Array.from(socketIOProvider.awareness.getStates().keys()).map(
            (key) => `${key}`
          )
        )
      );
      socketIOProvider.awareness.setLocalState({
        id: Math.random(),
        name: "Perico",
      });
      socketIOProvider.on("sync", (isSync: boolean) =>
        console.log("websocket sync", isSync)
      );
      socketIOProvider.on(
        "status",
        ({ status: _status }: { status: string }) => {
          if (!!_status) setStatus(_status);
        }
      );
      setSocket(socketIOProvider);
    }
  }, [doc, socket]);

  if (!socket) return <h1>Initializing provider...</h1>;

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!doc) return;
    const yMap = doc.getMap("data");
    yMap.set("input", e.target.value ?? "");
  };

  return (
    <AtomWrapper as="main" css={() => ContainerCSS}>
      <Header />
      <AtomWrapper
        css={() => css`
          gap: 30px;
          padding: 10px 90px;
        `}
      >
        <AtomText
          css={() => css`
            font-size: 32px;
          `}
        >
          StacklyUI
        </AtomText>
        <WrapperComponent title={`Component Theme: Active(${key})`} dot>
          <AtomButton
            astype={key === "dark" ? "flat" : "outline"}
            onClick={() => toggle("dark")}
          >
            Dark
          </AtomButton>
          <AtomButton
            astype={key === "light" ? "flat" : "outline"}
            onClick={() => toggle("light")}
          >
            Light
          </AtomButton>
        </WrapperComponent>

        <WrapperComponent title="LIVE TEST" type="main" dot>
          <AtomText
            css={() => css`
              font-size: 32px;
            `}
          >
            This is a live test page, you can test the components here. Status:
            {status}
          </AtomText>
          <AtomText>{JSON.stringify(clients, null, 4)}</AtomText>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={input}
            onChange={onChange}
          ></textarea>
          <AtomButton
            onClick={() => doc.getMap("data").set("input", `${Math.random()}`)}
          >
            Emit random change
          </AtomButton>
        </WrapperComponent>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default PageIndex;
