import QuranKemenag from 'quran-kemenag';
import {Surah} from 'quran-kemenag/dist/intefaces';
import React from 'react';
import {FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box, Circle, Col, Line, Padder, Row, ScaledText} from 'urip-rn-kit';
import Images from '../assets/images';
import Colors from '../constants/color.constant';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = (props: HomeScreenProps) => {
  const [listOfSurah, setListOfsurah]: [
    listOfSurah: Surah[],
    setListOfsurah: (value: any) => void,
  ] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const quran = new QuranKemenag();
    const data = await quran.getListSurah();
    setListOfsurah(data);
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white}}>
      <FlatList
        data={listOfSurah}
        keyExtractor={s => `${s.surah_id}`}
        renderItem={({item, index}) => {
          const onPress = () => {
              props.navigation.navigate('Detail', {surahNumber: item.surah_id})
          };
          return <SurahItem key={index} data={item} onPress={onPress} />;
        }}
      />
    </SafeAreaView>
  );
};

interface SurahItemProps {
  data: Surah;
  onPress: () => void;
}
const SurahItem = (props: SurahItemProps) => {
  return (
    <Col onPress={props.onPress}>
      <Padder horizontal={10}>
        <Row height={60}>
          <Col justifyCenter>
            <Box
              backgroundImage={Images.num_bg}
              height={35}
              width={35}
              justifyCenter
              alignCenter>
              <ScaledText size={13}>{props.data.surah_id}</ScaledText>
            </Box>
          </Col>
          <Col size={3} justifyCenter>
            <ScaledText size={18} bold>
              {props.data.surah_name}
            </ScaledText>
            <ScaledText
              color={
                Colors.grey2
              }>{`${props.data.surah_verse_count} verses`}</ScaledText>
          </Col>
          <Col size={3} justifyCenter alignEnd>
            <ScaledText color={Colors.purple1} size={20}>
              {props.data.surah_name_arabic}
            </ScaledText>
          </Col>
        </Row>
        <Line size={1} color={Colors.line} />
      </Padder>
    </Col>
  );
};

export default HomeScreen;
