import React, { useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import styled from "styled-components";
import SlideProd from "../../SlideProd/SlideProd";
import Recipe from "../../Recipe/Recipe";
import Footer from "../Components/Footer";

const Stack = createStackNavigator();

export default function Kurly() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="KurlyItem"
        options={{ headerShown: false }}
        component={KurlyItem}
      />
      <Stack.Screen
        name="SlideProd"
        options={{ headerShown: false }}
        component={SlideProd}
      />
    </Stack.Navigator>
  );
}

function KurlyItem({ navigation }) {
  const scrollRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  const btnActive = (e) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  const onFabPress = () => {
    scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderItem = ({ item }) => {
    return (
      <SlideProd
        sort_by_sub_category={item.sort_by_sub_category}
        navigation={navigation}
      />
    );
  };

  return (
    <Container> 
      <FlatList
        ref={scrollRef}
        onScroll={btnActive}
        scrollEventThrottle={16}
        data={ProdData}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
        ListFooterComponent={
          <>
            <Recipe />
            <Delivery
              source={{
                uri:
                  "https://img-cf.kurly.com/shop/data/main/15/mobile_img_1601803115.png",
              }}
            />
            <Footer />
          </>
        }
      />
      <TopBtn onPress={onFabPress}>
        <BtnImage
          valueY={scrollY}
          animation={scrollY > 700 ? "fadeIn" : false}
          delay={10}
          source={{
            uri:
              "https://res.kurly.com/mobile/service/common/1903/btn_pagetop_v3.png",
          }}
        />
      </TopBtn>
    </Container>
  );
}

const Container = styled.View`
  position: relative;
  background-color: ${({ theme }) => theme.color.White};
`;

const Delivery = styled.Image`
  width: 100%;
  height: 76px;
`;

const TopBtn = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  bottom: 100px;
`;

const BtnImage = Animatable.createAnimatableComponent(styled.Image`
  width: 46px;
  height: 46px;
  opacity: ${({ scrollY }) => (scrollY > 700 ? "1" : "0")};
`);

const ProdData = [
  {
    sort_by_sub_category: "이 상품 어때요?",
  },
  {
    sort_by_sub_category: "알뜰 상품",
  },
  {
    sort_by_sub_category: "오늘의 신상품",
  },
  {
    sort_by_sub_category: "지금 가장 핫한 상품",
  },
];
