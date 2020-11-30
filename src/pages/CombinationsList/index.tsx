import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StatusBar, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TotalCombinationsText, CombinationsListText } from './styles';

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

  const elements: Array<string> = [];
  const myArray: Array<string> = [];
  let counter = 0;

  const array = params.data.numbers;
  const qtdPorArray = params.data.qtdNumbers;
  const combinationsQuantity = params.data.combinationsQuantity;
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

  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={params.data.background} />
      <View style={{backgroundColor: params.data.background, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', paddingBottom: 20, marginTop: -10}}>
          <TotalCombinationsText >
            {combinations.length > 0 ?
            `${combinationsQuantity} COMBINAÇÕES` :
            'Carregando...'}
          </TotalCombinationsText>
          <View style={{ width: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

          </View>
        </View>
      </View>
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
