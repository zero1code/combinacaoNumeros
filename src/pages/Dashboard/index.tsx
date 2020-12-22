import React, { useState, useEffect } from 'react';
import { BANNER_AD, VIDEO_AD } from '@env';
import {
  View,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Balls from '../../components/Balls';
import {
  Container,
  ContainerScrollView,
  Title,
  HorizontalOptionslList,
  BtnOptionList,
  BtnOptionListText,
  BallsList,
  Footer,
  BtnCombine,
  BtnCombineText,
  PlusButton,
  ViewQuantity,
  ViewQuantityText,
  LessButton,
  SeeSavedCombinationsButton,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { data } from '../../data';

import admob, {
  MaxAdContentRating,
  TestIds,
  RewardedAd,
  BannerAd,
  RewardedAdEventType,
  AdEventType,
  BannerAdSize,
} from '@react-native-firebase/admob';
import { useNavigation } from '@react-navigation/native';

export interface Dataprops {
  id: number;
  title: string;
  image: string;
  background: string;
  opacity: string;
  numbers: number;
}

const adUnitId = __DEV__ ? TestIds.REWARDED : VIDEO_AD;

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

const adBannerId = __DEV__ ? TestIds.BANNER : BANNER_AD;

const Dashboard: React.FC = () => {

  const { navigate } = useNavigation();

  const [selectedItem, setSelecteditem] = useState<number>(0);
  const [quantityNumbers, setQuantityNumbers] = useState<string[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState('#209869');
  const [addOrRemove, setAddOrRemove] = useState<number>(0);
  const [combinations, setCombinations] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [combinationsQuantity, setCombinationsQuantity] = useState<number>(0);
  const [connected, setConnected] = useState(true);

  const elements: Array<string> = [];

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log(state.isConnected);
      setConnected(state.isConnected);
    });
  }, []);

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
      return;
    }

    if (selectedNumbers.length === 0 || addOrRemove === 0) {
      Alert.alert('Erro', 'Insira a quantidade de números por combinação!');
      setError(true);
      return;
    }

    if (!loaded) {
      handleNavigateToCombinationList();
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

  function handleNavigateToCombinationList() {
    const data = {
      background: selectedColor,
      numbers: selectedNumbers,
      qtdNumbers: addOrRemove,
    };

    navigate('combinationsList', { data });
  };

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

  function handleSelectedOptionsList(id: number): void {
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
  // TUDO SOBRE OS ANUNCIOS

  const [loaded, setLoaded] = useState(false);

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
        handleNavigateToCombinationList();
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


  function handleNavigateToSavedCombinations() {
    navigate('savedCombinations');
  }

  return (

    <Container>
      <ContainerScrollView>

        <StatusBar
          backgroundColor={
            selectedColor === '' ? '#209869' : `${selectedColor}`
          }
        />

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10}}>

        <Title>Combine aqui!</Title>
        <SeeSavedCombinationsButton
          background={selectedColor}
          onPress={handleNavigateToSavedCombinations}
        >
          <Icon name="bookmark" size={20} color="#fff" />
        </SeeSavedCombinationsButton>

        </View>

        <HorizontalOptionslList
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
              onPress={() => handleSelectedOptionsList(item.id)}
              activeOpacity={1}
            >
              <Image style={{width: 50, height: 50}} source={item.image} />
              <BtnOptionListText>{item.title}</BtnOptionListText>
            </BtnOptionList>
          )}
        />

        <View style={{alignItems: 'center'}}>
          <BallsList
            data={quantityNumbers}
            keyExtractor={item => String(item)}
            numColumns={6}
            renderItem={({ item }: {item: string}) => (
              <Balls
                key={item}
                background={selectedNumbers.includes(parseInt(item)) ? selectedColor : '#fafafa'}
                borderColor={selectedNumbers.includes(parseInt(item)) ? '#fff' : `${selectedColor}4D`}
                textColor={selectedNumbers.includes(parseInt(item)) ? '#fff' : '#444' }
                onPress={() => handleSelectedNumber(parseInt(item))}
              >
                {item}
              </Balls>
            )}
          />

          <View style={{alignItems: 'center'}}>
            <Footer>
                <BtnCombine
                  background={selectedColor}
                  rippleColor='#ffffff4D'
                  onPress={() => {
                    showAdVideo()
                  }}
                >
                  <BtnCombineText>COMBINAR</BtnCombineText>
                </BtnCombine>

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
        </View>
      </ContainerScrollView>
      {
        connected ?
        <BannerAd unitId={adBannerId} size={BannerAdSize.FULL_BANNER} />
        :
        <></>
      }

    </Container>
  );
};

export default Dashboard;
