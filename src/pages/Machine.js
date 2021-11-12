import React, {useEffect, useState} from "react";
import {get} from 'lodash';
import {useRecoilValue} from "recoil";
import {Button, Progress} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import {userState} from "../recoil/atoms/user";
import CloverSpiked from "../Icon/CloverSpiked";
import SlotMachine from "react-native-slot-machine";
import {Flex, Heading, Text, Box, Center, Avatar} from "native-base";

const Machine = () => {
  const user = useRecoilValue(userState);
  const [money, setMoney] = useState(100);
  const [energy, setEnergy] = useState(20);
  const [spining, setSpining] = useState(false);
  const [value, setValue] = useState(parseInt(Math.random() * 9999));

  const emojis = ['🍒', '🍓', '🍊', '🍋', '🍍', '🍎', '🍐', '🍏', '🍌', '🍇'];

  const handleSpin = () => {
    if (energy > 0 && !spining && money > 0) {
      setMoney(money - 10);
      setEnergy(energy - 1);
      setValue(parseInt(Math.random() * 999999).toString().slice(0, 4))
    }
  }

  useEffect(() => {
    if (value) {
      const currentValue = value.toString()
      if (
        (currentValue[0] === currentValue[1]) &&
        (currentValue[1] === currentValue[2]) &&
        (currentValue[2] === currentValue[3])
      ) {
        setMoney(money + 50);
        setEnergy(energy+1);
      }
    }
  }, [value])

  return (
    <Flex flexDirection="column">
      <Box top={10} left={-60} opacity={10} position='absolute' zIndex={10}>
        <Entypo name="rocket" size={300} color="#13BF97" />
      </Box>
      <Box top='96' right={-120} opacity={10} position='absolute' zIndex={10}>
        <Entypo name="credit" size={300} color="#13BF97" />
      </Box>
      <Flex flexDirection="row" zIndex={30} bgColor="#FFF" h={24} pt={10} pb={2} shadow={1} justifyContent="center">
        <Flex flexDirection="row" alignItems="center">
          <CloverSpiked size={42} color="#13BF97" />
          <Flex ml={2}>
            <Heading mb={.5} fontSize="lg">
              Tasi Machine
            </Heading>
            <Text fontSize="md">
              Your lucky slot machine!
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex zIndex={20} bgColor="#F6F6F6" flexDirection="row" py={2} px={4}>
        <Avatar source={{uri: get(user, 'picture.data.url', '')}} size="md" />
        <Flex w='80%' flexDirection="column" justifyContent="flex-start" ml={2}>
          <Flex w="100%" flexDirection="row" justifyContent="space-between">
            <Text color="#000" fontWeight="semibold">
              {get(user, 'name', '')}
            </Text>
            <Text>
              {`Saldo: R$ ${money}`}
            </Text>
          </Flex>
          <Text fontSize="sm" mb={1}>
            {`Energia restante ${energy}`}
          </Text>
          <Progress colorScheme="emerald" value={energy * 10} />
        </Flex>
      </Flex>
      <Center mt={12} zIndex={40}>
        <Box w='4/5' rounded="xl" bgColor="rgba(255, 255, 255, 0.5)" p={4} alignItems="center">
          <SlotMachine
            text={value}
            range="0123456789"
            duration={500}
            padding={3}
            useNativeDriver={true}
            renderContent={(pos) => (
              <Text style={{ fontSize: 18 }}>{emojis[pos]}</Text>
            )}
          />
        </Box>
        <Button w='2/4' rounded="2xl" p={4} mt={8} disabled={energy === 0} onPress={handleSpin} zIndex={40}>
          <Text fontSize="xl" fontWeight="semibold" color="#FFF">
            Girar
          </Text>
        </Button>
      </Center>
    </Flex>
  )
}

export default Machine;