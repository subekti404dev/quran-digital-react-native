import QuranKemenag from 'quran-kemenag';
import {Verse} from 'quran-kemenag/dist/intefaces';
import React from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import {
  Box,
  Circle,
  Col,
  Gap,
  ImgIcon,
  Line,
  Padder,
  Row,
  ScaledText,
} from 'urip-rn-kit';
import Icons from '../assets/icons';
import Images from '../assets/images';
import Colors from '../constants/color.constant';

interface DetailScreenProps {
  navigation: any;
  route: any;
}

const DetailScreen = (props: DetailScreenProps) => {
  const [surah, setSurah]: [surah: any, setSurah: any] = React.useState(null);
  const [verses, setVerses]: [verses: any[], setVerses: any] = React.useState(
    [],
  );

  React.useEffect(() => {
    const {surahNumber} = props.route.params;
    getData(surahNumber);
  }, []);

  const getData = async (surah_id: number) => {
    const quran = new QuranKemenag();
    const data = await quran.getSurah(surah_id);
    setSurah(data);
    setVerses(data.verses || []);
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white}}>
      <Row height={50}>
        <Col justifyCenter alignCenter>
          <ImgIcon
            onPress={() => props.navigation.goBack()}
            source={Icons.back}
            size={35}
            tintColor={Colors.grey2}
          />
        </Col>
        <Col size={5} justifyCenter>
          <ScaledText size={21} bold color={Colors.purple1}>
            {surah ? surah.surah_name : ''}
          </ScaledText>
        </Col>
      </Row>
      <Padder horizontal={20}>
        <Box
          justifyCenter
          alignCenter
          borderRadius={10}
          height={100}
          fullWidth
          backgroundImage={Images.bg}>
          <ScaledText color={Colors.white} size={20} bold>
            {surah ? surah.surah_name : ''}
          </ScaledText>
          <ScaledText color={Colors.white} size={18}>
            {surah ? surah.surah_name_bahasa : ''}
          </ScaledText>
          <ScaledText color={Colors.white} size={13}>
            {surah ? `${surah.surah_verse_count} VERSES` : ''}
          </ScaledText>
        </Box>
      </Padder>
      <Gap size={20} vertical />
      <FlatList
        data={verses}
        keyExtractor={v => v.verse_id}
        renderItem={({item, index}) => {
          return <VerseItem key={index} data={item} />;
        }}
        ListFooterComponent={<Gap vertical size={200} />}
      />
    </SafeAreaView>
  );
};

interface VerseItemProps {
  data: Verse;
}

const VerseItem = (props: VerseItemProps) => {
  return (
    <Padder horizontal>
      <Col>
        <Row>
          <Col>
            <Padder horizontal>
              <Box borderRadius={10} fullWidth color={Colors.grey3} height={45}>
                <Row>
                  <Col size={3} justifyCenter>
                    <Padder horizontal>
                      <Circle size={30} color={Colors.purple1}>
                        <ScaledText color={Colors.white}>
                          {props.data.verse_number}
                        </ScaledText>
                      </Circle>
                    </Padder>
                  </Col>
                  <Col justifyCenter>
                    <Row alignCenter justifyEnd>
                      <ImgIcon
                        source={Icons.play}
                        tintColor={Colors.purple1}
                        size={30}
                      />
                      <ImgIcon
                        source={Icons.share}
                        tintColor={Colors.purple1}
                        size={25}
                      />
                      <Gap />
                    </Row>
                  </Col>
                </Row>
              </Box>
            </Padder>
          </Col>
        </Row>
        <Row justifyEnd>
          <Padder all>
            <ScaledText size={22}>{props.data.verse_arabic}</ScaledText>
          </Padder>
        </Row>
        <Row>
          <Padder horizontal>
            <ScaledText size={14}>{props.data.verse_bahasa}</ScaledText>
          </Padder>
        </Row>
        <Gap vertical />
        <Line />
        <Gap vertical />
      </Col>
    </Padder>
  );
};

export default DetailScreen;
