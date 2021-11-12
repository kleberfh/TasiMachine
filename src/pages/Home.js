import React from "react";
import {useSetRecoilState} from "recoil";
import * as Facebook from 'expo-facebook';
import CloverSpiked from "../Icon/CloverSpiked";
import {userState} from "../recoil/atoms/user";
import {Button, Flex, Heading, Text} from "native-base";

const Home = () => {
  const setUser = useSetRecoilState(userState);

  const login = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '422487702779004',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setUser(data)
          })
          .catch(e => console.log(e))
      } else {
      }
    } catch ({ message }) {
      alert(`Erro no login: ${message}`);
    }
  }

  return (
    <Flex flexDirection="column" alignItems="center" flex={1}>
      <Flex flexDirection="row" alignItems="center" mt={64}>
        <CloverSpiked size={80} color="#13BF97" />
        <Flex ml={2}>
          <Heading mb={1} fontSize="3xl">
            Tasi Machine
          </Heading>
          <Text fontSize="xl">
            Your lucky slot machine!
          </Text>
        </Flex>
      </Flex>
      <Button
        py={3}
        px={6}
        mt={12}
        size="lg"
        rounded="full"
        onPress={login}
        bgColor="#13BF97"
        _pressed={{backgroundColor: '#0d8267'}}
      >
        <Text fontSize="lg" fontWeight="semibold" color="#FFF">
          Fazer login com Facebook
        </Text>
      </Button>
    </Flex>
  )
}

export default Home;