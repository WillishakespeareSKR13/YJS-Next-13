import {
  AtomButton,
  AtomIcon,
  AtomInput,
  AtomText,
  AtomTextEditor,
  AtomWrapper,
  colorIcon,
  css,
  useEditor,
  useTheme,
} from "@stacklycore/ui";
import Header from "../components/Header";
import WrapperComponent from "../components/WrapperComponent";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { socketAtom } from "../jotai/socket";
import { inputAtom } from "../jotai/input";
import { statusAtom } from "../jotai/status";
import { clientsAtom } from "../jotai/clients";
import { docAtom } from "../jotai/doc";
import Collaboration from "@tiptap/extension-collaboration";
import config from "../config";
import { mousesAtom } from "../jotai/mouses";

const ContainerCSS = css`
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  /* cursor: none;
  * {
    cursor: none;
  } */
`;

const colors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
];

const PageIndex = () => {
  const { key, toggle } = useTheme();
  const [togglePointer, setTogglePointer] = useState(false);
  const [mouses, setMouses] = useAtom(mousesAtom);
  const [socket, setSocket] = useAtom(socketAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [clients, setClients] = useAtom(clientsAtom);
  const [doc, setDoc] = useAtom(docAtom);

  const docMemo = useMemo(
    () =>
      doc
        ? [
            Collaboration.configure({
              document: doc,
            }),
          ]
        : [],
    [doc]
  );

  const editor = useEditor(
    {
      extensions: [...docMemo],
    },
    [doc]
  );

  useEffect(() => {
    if (!doc) {
      console.log("setting doc");
      const _doc = new Y.Doc();
      const yMap = _doc.getMap("data");
      if (!yMap.has("input")) {
        yMap.observe((event, transaction) => {
          const mouse = yMap.get("mouse") as any;
          setMouses((prev) => ({
            ...prev,
            [mouse.id]: mouse,
          }));
        });
      }
      setDoc(_doc);
    }
  }, [doc]);

  useEffect(() => {
    if (doc) {
      const saveMousePosition = (event: MouseEvent) => {
        const getID = doc?.clientID;
        const yMap = doc.getMap("data");
        yMap.set("mouse", {
          x: event.clientX,
          y: event.clientY,
          id: getID,
        });
      };
      document.addEventListener("mousemove", saveMousePosition);
      return () => {
        document.removeEventListener("mousemove", saveMousePosition);
      };
    }
  }, [doc]);

  useEffect(() => {
    if (!!doc && !socket) {
      console.log("setting providers");
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

  console.log(mouses);

  if (!socket) return <h1>Initializing provider...</h1>;

  return (
    <AtomWrapper
      as="main"
      css={() => css`
        ${ContainerCSS}
        ${togglePointer &&
        css`
          cursor: none;
          * {
            cursor: none;
          }
        `}
      `}
    >
      <Header />
      {clients?.map((values) => {
        const mouse = mouses[values];
        const id = doc?.clientID;
        const color = colors[id % colors.length];
        if (mouse?.id === id && !togglePointer) return <></>;
        return (
          <React.Fragment key={mouse?.id}>
            <AtomWrapper
              css={() => css`
                width: max-content;
                height: max-content;
                position: absolute;
                background-color: transparent;
                top: ${mouse?.y}px;
                left: ${mouse?.x}px;
                transform: translate(2px, calc(-100% + 20px));
                z-index: 9999;
                user-select: none;
                * {
                  user-select: none;
                }
              `}
            >
              <AtomText
                css={() => css`
                  font-size: 12px;
                  font-weight: 700;
                  color: ${color};
                `}
              >
                {id}
              </AtomText>
              <AtomIcon
                icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/SERVICE-ERROR-MANAGEMENT/icons/pointer.svg"
                css={() => css`
                  width: 20px;
                  height: 20px;
                  transform: rotate(-90deg);
                  svg {
                    path {
                      stroke: ${color} !important;
                      fill: ${color} !important;
                    }
                  }
                `}
              />
            </AtomWrapper>
          </React.Fragment>
        );
      })}
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
        <WrapperComponent title={`See Mouse`} dot>
          <AtomInput
            type="toggle"
            input={{
              checked: togglePointer,
              onChange: (e) => setTogglePointer((prev) => !prev),
            }}
          />
        </WrapperComponent>
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
          <AtomTextEditor editor={editor} />

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
