import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { VIDEO_AD } from '@env';
import Icon from 'react-native-vector-icons/Feather';

import Balls from '../../components/Balls';

import {
  Container,
  Title,
  SavedCombinationsList,
  CombinationContainer,
  CombinationContainerText,
  DeleteButton,
  Content } from './styles';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import admob, {
  MaxAdContentRating,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
} from '@react-native-firebase/admob';

export interface SavedCombinationProps {
  id: number;
  numbers: Array<{
    number: number;
  }>;
  numbersQuantity: number;
  background: string;
}

const adUnitId = __DEV__ ? TestIds.REWARDED : VIDEO_AD;

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });


const SavedCombinations: React.FC = () => {

  const { navigate } = useNavigation();

  const [savedCombinations, setSavedCombinations] = useState<SavedCombinationProps[]>([]);
  const [data, setData] = useState({});
  const [adSaw, setAdSaw] = useState(false);

  useEffect(() => {
    if (adSaw) {
      setAdSaw(!adSaw);
      navigate('combinationsList', { data });
    }
  }, [adSaw]);

  useEffect(() => {
    AsyncStorage.getItem('combinations', (err, result) => {
      if (result !== null) {
        const data = JSON.parse(result);

        data.map((item: SavedCombinationProps, index: number) => {
          Object.assign(item, {id: index})
        });

        setSavedCombinations(data.reverse());
      }
    });
  }, [savedCombinations]);

    function handleDeleteCombination(id: number) {
    Alert.alert(
      'Excluir combinação',
      'Tem certeza que deseja continuar?',
      [
        {
          text: 'NÃO',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => {deleteCombination(id)},
        },
      ],
    );
  }

  async function deleteCombination(id: number) {
    const combinations = savedCombinations.filter((item) => item.id !== id);
    await AsyncStorage.setItem('combinations', JSON.stringify(combinations))
      .then(() => {
        Alert.alert('Combinação Excluída', 'Sua combinação foi excluída!');
      })
      .catch(() => {
        Alert.alert('Erro ao excluir a combinação', 'Tente novamente.');
      })
    setSavedCombinations(combinations);
  }

  function handleNavigateToCombinationsList(numbers: number[], qtdNumbers: number, background: string) {

    const data = {
      numbers,
      qtdNumbers,
      background,
    };

    setData(data);

    if (!loaded) {
      navigate('combinationsList', { data });
    } else {
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
        setAdSaw(true);
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
      <SavedCombinationsList ListHeaderComponent = {
        <>
          <Title>Suas combinações</Title>
        </>
      }
      data={savedCombinations}
      keyExtractor={(combination) => String(combination.id)}
      renderItem={({item}) => (
        <View key={item.id} style={{ marginTop: 10, borderRadius: 50}}>
          <CombinationContainer
            background={`${item.background}8C`}
            onPress={() => handleNavigateToCombinationsList(item.numbers, item.numbersQuantity, item.background)}
          >
            {item.numbers.map(number => (
              <Balls
              key={number}
              background="#fff"
              borderColor={item.background}
              textColor="#000"
            >
              {String(number)}
            </Balls>
            ))}
          </CombinationContainer>
          <Content background={item.background}>
              <CombinationContainerText>
                {item.numbersQuantity} {item.numbersQuantity !== 1 ? 'números' : 'número' } por combinação
              </CombinationContainerText>
              <DeleteButton>
                <Icon name="trash" size={20} color="#fff" style={{padding: 5}} onPress={() => handleDeleteCombination(item.id)} />
              </DeleteButton>
              </Content>
        </View>
      )}
      />
    </Container>
  );
}

export default SavedCombinations;
