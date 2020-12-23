import React, { useEffect, useState } from 'react';
import { Alert, Share, ScrollView, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TotalCombinationsText,
  CombinationsListText,
  SaveButton,
  ShareButton,
  SeeSavedCombinationsButton,
  Header,
  ButtonsContainer,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import PrintCombinations from '../../service/PrintCombinations';

interface CombinatiosDataProps {
  data: {
    numbers: number[];
    qtdNumbers: number;
    background: string;
    combinationsQuantity: number
  };
}

const CombinationsList: React.FC = () => {
  const route = useRoute();
  const params = route.params as CombinatiosDataProps;

  const { navigate } = useNavigation();

  const array = params.data.numbers;
  const qtdPorArray = params.data.qtdNumbers;
  const selectedColor = params.data.background;
  const [combinationsQuantity, setCombinationsQuantity] = useState(0);
  const [combinations, setCombinations] = useState<string[]>([]);
  const [loadingCombinations, setLoadingCombinations] = useState<boolean>(true);

  useEffect(() => {
    if (!loadingCombinations) {
      if (combinationsQuantity > 2000) {
        setCombinations([...combinations, `E mais ${combinationsQuantity - 2000} combinações...`]);
      }
    }
  },[loadingCombinations]);

  useEffect(() => {
    combinations.map((item, index) => {
      if (combinations.length === index + 1){
        setLoadingCombinations(false)
      }
    })
  }, [combinations]);

  useEffect(() => {

    const print = PrintCombinations(array, qtdPorArray);
    const result = print[0];

    setCombinations(result);
    setCombinationsQuantity(print[1]);

  }, [array]);

  async function save() {

    const saveCombination = {
      numbers: array,
      numbersQuantity: qtdPorArray,
      background: selectedColor,
      // combinationsQuantity,
    }

    const existingCombinations = await AsyncStorage.getItem('combinations');

    let combination = JSON.parse(existingCombinations);

    if (!combination) {
      combination = [];
    }

    const existsCombination = combination.map((item) => {
      if (
        JSON.stringify(item.numbers) === JSON.stringify(saveCombination.numbers) &&
        // item.combinationsQuantity === saveCombination.combinationsQuantity &&
        item.background === saveCombination.background
      ) {
        return true;
      }
    });
    if (existsCombination.includes(true)) {
      Alert.alert('Atenção', 'Você já tem essa mesma combinação salva!');
      return;
    }

    combination.push(saveCombination);

    await AsyncStorage.setItem('combinations', JSON.stringify(combination))
      .then(() => {
        Alert.alert('Combinação Salva', 'Os números escolhidos foram salvos!');
      })
      .catch(() => {
        Alert.alert('Erro ao salvar a combinação', 'Tente novamente.');
      })

  }

  async function shareCombinations() {

    let combinationsNumbers = '';

    for (var i=0; i < combinations.length; i++) {
      combinationsNumbers += `${i + 1}º - ${combinations[i]} \n\n`
    }

    try {
      const result = await Share.share({
        title: 'Compartilhar combinações em...',
        message: `Aqui estão as suas combinações!\nBaixe já o nosso app!\nhttps://play.google.com/store/apps/details?id=loteria.combinacao.google.com.combinacaoloterias\n\n${combinationsNumbers}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  }

  function handleNavigateToSavedCombinations() {
    setCombinations([]);
    setCombinationsQuantity(0);
    navigate('savedCombinations');
  }

  return (
    <>
      <StatusBar
        backgroundColor={selectedColor} />

        <Header background={selectedColor}>
          <TotalCombinationsText >
            {combinations.length > 0 ?
            `${combinationsQuantity} COMBINAÇÕES` :
            'Carregando...'}
          </TotalCombinationsText>
          <ButtonsContainer>
            <SaveButton
              onPress={save}
            >
                <Icon name="save" size={20} color="#fff" />
            </SaveButton>
            <ShareButton
              onPress={shareCombinations}
            >
              <Icon name="share-2" size={20} color="#FFF" />
            </ShareButton>
            <SeeSavedCombinationsButton
              onPress={handleNavigateToSavedCombinations}
            >
          <Icon name="bookmark" size={20} color="#fff" />
        </SeeSavedCombinationsButton>
          </ButtonsContainer>
        </Header>
      <ScrollView >
        {combinations.map((item, index) => (
          <View key={item}>
            <CombinationsListText>{ index === 2000 ? item : `${index+1}º  ${item}`}</CombinationsListText>
            <View style={{backgroundColor: '#e0e0e0',height: 0.5,}}/>
            </View>
        ))}
      </ScrollView>
  </>

  )
};

export default CombinationsList;
