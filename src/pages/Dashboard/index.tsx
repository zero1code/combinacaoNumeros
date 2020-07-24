import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StatusBar,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  BodyApp,
  BodyAppList,
  Title,
  OptionList,
  BtnOptionList,
  BtnOptionListText,
  BallsList,
  Balls,
  BallText,
  Footer,
  BtnCombine,
  LoadingBtnCombine,
  BtnCombineText,
  PlusButton,
  ViewQuantity,
  ViewQuantityText,
  LessButton,
  CombinationsContainer,
  TotalCombinationsText,
  CombinationsListText,
} from './styles';
import { PanGestureHandler, State, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { data } from '../../data';

import admob, {
  MaxAdContentRating,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
} from '@react-native-firebase/admob';

interface Dataprops {
  id: number;
  title: string;
  image: string;
  background: string;
  opacity: string;
  numbers: number;
}

const Dashboard: React.FC = () => {
  const [selectedItem, setSelecteditem] = useState<number>(0);
  const [quantityNumbers, setQuantityNumbers] = useState<string[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState('#209869');
  const [addOrRemove, setAddOrRemove] = useState<number>(0);
  const [combinations, setCombinations] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loadingCombinations, setLoadingCombinations] = useState<boolean>(false);
  const [combinationsQuantity, setCombinationsQuantity] = useState<number>(0);

  const elements: Array<string> = [];
  const myArray: Array<string> = [];
  let counter = 0;

  let offeset = 0;
  const translateY = new Animated.Value(0);
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        }
      }
    ],
    {useNativeDriver: true},
  );

  useEffect(() => {
    if (combinationsQuantity > 2000) {
      setCombinations([...combinations, `E mais ${combinationsQuantity - 2000} combinações...`]);
    }
  },[combinationsQuantity]);

  useEffect(() => {
    if (loadingCombinations === true) {
      printCombinations(selectedNumbers, addOrRemove);
    }
  }, [loadingCombinations]);

  useEffect(() => {
    combinations.map((item, index) => {
      if (combinations.length === index + 1){
        setLoadingCombinations(false)
      }
    })
  }, [combinations]);

  useEffect(() => {
    if (selectedItem === 0 && addOrRemove > 15) {
      Alert.alert('Erro', 'Você pode escolher até 15 números por aposta na Mega Sena!');
      setAddOrRemove(15);
    } else if ( selectedItem === 1 && addOrRemove > 15) {
      Alert.alert('Erro', 'Você pode escolher até 15 números por aposta na Quina!');
      setAddOrRemove(15);
    } else if ( selectedItem === 2 && addOrRemove > 18) {
      Alert.alert('Erro', 'Você pode escolher até 18 números por aposta na Lotofácil!');
      setAddOrRemove(18);
    } else if ( selectedItem === 3 && addOrRemove > 50) {
      Alert.alert('Erro', 'Você pode escolher até 50 números por aposta na Lotomania!');
      setAddOrRemove(50);
    } else if ( selectedItem === 1 && addOrRemove > 15) {
      Alert.alert('Erro', 'Você pode escolher até 15 números por aposta na Dupla Sena!');
      setAddOrRemove(15);
    } else if ( selectedItem === 1 && addOrRemove > 15) {
      Alert.alert('Erro', 'Você pode escolher até 15 números por aposta em Dia de Sorte!');
      setAddOrRemove(15);
    }
    else {

    }
  }, [addOrRemove]);

  useEffect(() => {
    function setNumbers(id: number) {
      const [numbersQuantity] = data.filter((item) => item.id === id);

      if (id === 3) {
        for (let i = 1; i < numbersQuantity.numbers; i++) {
          if (i < 10) {
            elements.push(`0${String(i)}`);
          } else {
            elements.push(String(i));
          }
        }
        elements.push('00');
      } else {
        for (let j = 1; j <= numbersQuantity.numbers; j++) {
          if (j < 10) {
            elements.push(`0${String(j)}`);
          } else {
            elements.push(String(j));
          }
        }
      }

      setQuantityNumbers(elements);
    }
    setNumbers(selectedItem);
  }, [selectedItem]);

  function showAdVideo() {

    if (addOrRemove > selectedNumbers.length) {
      Alert.alert('Erro', 'A quantidade de números por combinação não pode ser maior que a quantidade de números escolhidos!');
      setLoadingCombinations(false);
      return;
    }

    if (selectedNumbers.length === 0 || addOrRemove === 0) {
      Alert.alert('Erro', 'Insira a quantidade de números por combinação!');
      setError(true);
      setLoadingCombinations(false);
      return;
    }

    if (!loaded) {
      setLoadingCombinations(true);
    }
    else {
      Alert.alert(
        'Anúncio',
        'Assista um anúncio para apoiar o desenvolvedor do aplicativo.',
        [
          {
            text: 'NÃO',
            style: 'cancel',
          },
          {
            text: 'ASSISTIR',
            onPress: () => {rewarded.show()},
          },
        ],
        { cancelable: false }
      )
    }
  }

  function handleIncrementOrDecrement(number: number): void {
    setError(false);
    if (number === 1) {
      if (addOrRemove > 99) {
        Alert.alert('Erro', 'Quantidade máxima de números por combinação permitida é de 100!');
        setAddOrRemove(100);
      } else {
        setAddOrRemove(addOrRemove + number);
      }
    } else {
      if (addOrRemove === 0) {
        Alert.alert('Erro', 'Não pode haver números negativos!');
        setAddOrRemove(0);
      } else {
        setAddOrRemove(addOrRemove - 1);
      }
    }

  }

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;
      offeset += translationY;

      if (translationY <= -91) {
        opened = true;
      } else {
        translateY.setValue(offeset);
        translateY.setOffset(0);
        offeset = 0;
      }

      Animated.timing(translateY, {
        toValue:  opened ? -370 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offeset = opened ? -370 : 0;
        translateY.setOffset(offeset);
        translateY.setValue(0);
      });

    }
  }

  function handleSelectedItem(id: number): void {
    if (selectedItem !== id) {
      setSelecteditem(id);
      setBackgroundColor(id);
      setSelectedNumbers([]);
      setCombinations([]);
      setCombinationsQuantity(0);
    }
  }

  function handleSelectedNumber(number: number): void {
    const alreadySelected = selectedNumbers.findIndex(
      (item) => item === number,
    );

    if (alreadySelected >= 0) {
      const filteredItems = selectedNumbers.filter((item) => item !== number);

      setSelectedNumbers(filteredItems);
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  }

  function setBackgroundColor(id: number): void {
    const [response] = data.filter((item) => item.id === id);

    setSelectedColor(response.background);
  }

  function printCombinations(array: Array<number>, qtdPorArray: number): void {

    const combination: Array<number> = [];

    function run(level: number, start: number): void {
      for (let i = start; i < array.length - qtdPorArray + level + 1; i++) {
        combination[level] = array[i];

        if (level < qtdPorArray - 1) {
          run(level + 1, i + 1);
        } else {

          if (counter < 2000) {
            myArray.push(combination.join(', '));

            setCombinations(myArray);
          }
          counter++;
        }
      }
    }
    run(0, 0);
    setCombinationsQuantity(counter);
  }

  // TUDO SOBRE OS ANUNCIOS

  const [loaded, setLoaded] = useState(false);

  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-8710078732554281/2731061542';

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      // Request config successfully set!
    });

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        setLoadingCombinations(true);
        setLoaded(false);
      }
      if (type === AdEventType.CLOSED) {
        setLoaded(false);

        //reload ad
        rewarded.load();
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, [rewarded]);

  return (

    <Container>

      <StatusBar
        backgroundColor={
          selectedColor === '' ? '#209869' : `${selectedColor}`
        }
      />

        <BodyApp style={
          {opacity: translateY.interpolate({
            inputRange: [-370, 0],
            outputRange: [0.4, 1],
            extrapolate: 'clamp',
          }), backgroundColor: '#f2f2f2' }
        }>
          <BodyAppList
            ListHeaderComponent={
              <>
                <Title>Faça as suas combinações aqui!</Title>
                <View style={{ height: 150 }}>
                  <OptionList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }: { item: Dataprops}) => (
                      <BtnOptionList
                        key={String(item.id)}
                        activeScale={0.90}
                        background={`${item.background}${item.opacity}`}
                        borderColor={`${item.background}${item.opacity}`}
                        selectedOption={selectedItem === item.id
                          ? item.background
                          : `${item.background}${item.opacity}`}
                        onPress={() => handleSelectedItem(item.id)}
                        activeOpacity={1}
                      >
                        <Image style={{width: 50, height: 50}} source={item.image} />
                        <BtnOptionListText>{item.title}</BtnOptionListText>
                      </BtnOptionList>
                    )}
                  />
                </View>
              </>
            }
            ListFooterComponent={
              <View style={{ alignItems: 'center' }}>
                <BallsList
                  data={quantityNumbers}
                  keyExtractor={item => String(item)}
                  numColumns={6}
                  renderItem={({ item }: {item: string}) => (
                    <Balls
                      activeOpacity={0.5}
                      key={item}
                      background={selectedNumbers.includes(parseInt(item)) ? selectedColor : '#fafafa'}
                      borderColor={selectedNumbers.includes(parseInt(item)) ? '#fff' : `${selectedColor}4D`}
                      onPress={() => handleSelectedNumber(parseInt(item))}
                    >
                      <BallText textColor={selectedNumbers.includes(parseInt(item)) ? '#fff' : '#444' }>
                        {item}
                      </BallText>
                    </Balls>
                  )}
                />
              <View />
          <Footer>
            {loadingCombinations === false ?
              <BtnCombine
              background={selectedColor}
              rippleColor='#ffffff4D'
              onPress={() => {
                showAdVideo()
              }}
            >
              <BtnCombineText>COMBINAR</BtnCombineText>
            </BtnCombine> :

              <LoadingBtnCombine background={selectedColor}>
                <ActivityIndicator size="large" color="#fff" />
              </LoadingBtnCombine>
            }

            <PlusButton onPress={() => handleIncrementOrDecrement(1)}>
              <Icon name="plus-circle" size={24} color="#666" />
            </PlusButton>
            <ViewQuantity error={error}>
              <ViewQuantityText>{addOrRemove}</ViewQuantityText>
            </ViewQuantity>
            <LessButton onPress={() => handleIncrementOrDecrement(-1)}>
              <Icon name="minus-circle" size={24} color="#666" />
            </LessButton>
          </Footer>

        </View>
            }
          />
        </BodyApp>

      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChanged}
      >
        <CombinationsContainer style={[
            {transform: [{
              translateY: translateY.interpolate({
                inputRange: [-370, 0, 370],
                outputRange: [-370, 0, 370],
                extrapolate: 'clamp',
              })
            }]}
          ]}>
          <View style={{backgroundColor: selectedColor, alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <Icon name='minus' size={30} color='#fff' />
            <TotalCombinationsText >
              {combinations.length > 0 ?
              `${combinationsQuantity} COMBINAÇÕES` :
              'Suas combinações aparecerão aqui!'}
            </TotalCombinationsText>
          </View>
          <ScrollView style={{height: 378}}>
            {combinations.map((item, index) => (
              <View key={item}>
                <CombinationsListText>{ index === 2000 ? item : `${index+1}º  ${item}`}</CombinationsListText>
                <View style={{backgroundColor: '#e0e0e0',height: 0.5,}}/>
                </View>
            ))}
          </ScrollView>
        </CombinationsContainer>
      </PanGestureHandler>
    </Container>
  );
};

export default Dashboard;
