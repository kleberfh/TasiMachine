import React from 'react';
import Index from "./src";
import { RecoilRoot } from 'recoil';
import {NativeBaseProvider, Flex} from "native-base";

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <Flex flex={1} bgColor="#EDEDED">
          <Index />
        </Flex>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
