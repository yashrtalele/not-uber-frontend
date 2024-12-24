import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { debounce } from 'lodash';
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { MapPinHouse, MapPinned } from '@tamagui/lucide-icons';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';

type LocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    fontFamily: 'Lexend',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

function PlaceItem({ place, onPress, colors }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(place)}
      style={{ paddingLeft: 30, paddingRight: 20, padding: 15 }}>
      <Text style={{ fontFamily: 'Lexend', color: colors.lightText }}>
        {place.description}
      </Text>
    </TouchableOpacity>
  );
}

export default function Home() {
  const router = useRouter();
  const { colors } = useTheme();
  const { EXPO_PUBLIC_GOOGLE_API_KEY } = process.env;
  const currentTextInputRef = useRef(null);
  const destinationTextInputRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [destinationText, setDestinationText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [destinationLocation, setDestinationLocation] =
    useState<LocationType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [placeDetails, setPlaceDetails] = useState([]);
  const [places, setPlaces] = useState([]);
  const snapPoints = useMemo(() => ['1%', '37%', '85%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 2) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const openModal = (type: string) => {
    bottomSheetRef.current?.snapToIndex(3);
    setLocationType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setLocationType('');
    setIsModalOpen(false);
  };

  const [currentMarker, setCurrentMarker] = useState({
    latlng: { latitude: 51.5078788, longitude: -0.0877321 },
    title: 'Current',
    description: 'This is the current location',
  });
  const [destinationMarker, setDestinationMarker] = useState({
    latlng: { latitude: 51.5145, longitude: -0.083 },
    title: 'Destination',
    description: 'This is the destination location',
  });

  const fetchPlaces = async (query: string) => {
    try {
      // const apiKey = EXPO_PUBLIC_GOOGLE_API_KEY;
      const apiKey = '';
      if (query !== '') {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.predictions) {
          setPlaces(data.predictions);
        }
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const debouncedFetchPlaces = useCallback(debounce(fetchPlaces, 1000), []);

  const fetchPlaceDetails = async (placeId: string, lType: string) => {
    try {
      // const apiKey = EXPO_PUBLIC_GOOGLE_API_KEY;
      const apiKey = '';
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.result) {
        if (lType === 'current') {
          setCurrentMarker({
            latlng: {
              latitude: data.result.geometry.location.lat,
              longitude: data.result.geometry.location.lng,
            },
            title: data.result.name,
            description: data.result.formatted_address,
          });
          setCurrentLocation({
            ...currentLocation,
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng,
          });
        } else {
          setDestinationMarker({
            latlng: {
              latitude: data.result.geometry.location.lat,
              longitude: data.result.geometry.location.lng,
            },
            title: data.result.name,
            description: data.result.formatted_address,
          });

          setDestinationLocation({
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng,
            longitudeDelta: 0.02,
            latitudeDelta: 0.02,
          });
        }

        setPlaceDetails(data.result);
        setPlaces([]);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handlePlaceSelect = (details: google.maps.places.PlaceResult) => {
    if (details.place_id) {
      if (locationType === 'current') {
        setCurrentText(details.description);
        currentTextInputRef.current?.setNativeProps({
          selection: { start: 0, end: 0 },
        });
      } else {
        setDestinationText(details.description);
        destinationTextInputRef.current?.setNativeProps({
          selection: { start: 0, end: 0 },
        });
      }

      fetchPlaceDetails(details.place_id, locationType);
    } else {
      console.error('Place ID is undefined.');
    }
  };

  const handleNext = () => {
    // if (destinationLocation && currentLocation) {
    //   console.log('currentLocation', currentLocation);
    //   console.log('destinationLocation', destinationLocation);
    //   router.push({
    //     pathname: '/(trip)/ChooseVehicle',
    //     params: {
    //       currLocLat: currentLocation.latitude,
    //       currLocLong: currentLocation.longitude,
    //       destLocLat: destinationLocation.latitude,
    //       destLocLong: destinationLocation.longitude,
    //     },
    //   });
    // } else {
    //   alert('Please select current location and destination location!');
    // }
    router.push({
      pathname: '/(trip)/ChooseVehicle',
      params: {
        currLocLat: 20.00865869999999,
        currLocLong: 73.7593693,
        currLocLatdelta: 0.02,
        currLocLongdelta: 0.02,
        destLocLat: 19.9984845,
        destLocLong: 73.75293409999999,
        destLocLatdelta: 0.02,
        destLocLongdelta: 0.02,
      },
    });
  };

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        ...currentLocation,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }

    getCurrentLocation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <MapView
            mapType="mutedStandard"
            style={styles.map}
            region={currentLocation}
            showsUserLocation>
            {destinationLocation && (
              <MapViewDirections
                origin={currentLocation}
                destination={destinationLocation}
                apikey=""
                strokeWidth={3}
                strokeColor="black"
              />
            )}
            {currentLocation && (
              <Marker
                key="current"
                coordinate={currentMarker.latlng}
                title={currentMarker.title}
                description={currentMarker.description}
              />
            )}
            {destinationLocation && (
              <Marker
                key="destination"
                coordinate={destinationMarker.latlng}
                title={destinationMarker.title}
                description={destinationMarker.description}
              />
            )}
          </MapView>
        </View>
        <BottomSheet
          detached
          index={1}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          handleIndicatorStyle={{
            backgroundColor: colors.background,
          }}
          backgroundStyle={{
            borderRadius: 40,
            backgroundColor: colors.background,
          }}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <View
              style={{
                flex: 1,
                width: '80%',
                alignContent: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                  closeModal();
                }}>
                <View
                  style={{
                    paddingRight: 10,
                    paddingLeft: 20,
                    paddingTop: 20,
                    marginRight: 10,
                  }}>
                  <Text style={[styles.title, { color: colors.text }]}>
                    Set your destination, and let&apos;s roll!
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 30,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{ paddingLeft: 25, paddingRight: 20 }}>
                    <MapPinHouse />
                  </View>

                  <TextInput
                    ref={currentTextInputRef}
                    onFocus={() => openModal('current')}
                    placeholder="Add a pick-up location"
                    value={currentText}
                    style={{
                      height: 50,
                      width: 270,
                      borderRadius: 20,
                      paddingLeft: 30,
                      paddingRight: 30,
                      backgroundColor: colors.tint,
                      color: colors.text,
                      fontFamily: 'Lexend',
                      fontSize: 15,
                    }}
                    onChangeText={text => {
                      setCurrentText(text);
                      debouncedFetchPlaces(text);
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingTop: 30,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{ paddingLeft: 25, paddingRight: 20 }}>
                    <MapPinned />
                  </View>
                  <TextInput
                    ref={destinationTextInputRef}
                    onFocus={() => openModal('destination')}
                    placeholder="Add your destination"
                    onChangeText={text => {
                      setDestinationText(text);
                      debouncedFetchPlaces(text);
                    }}
                    value={destinationText}
                    style={{
                      height: 50,
                      width: 270,
                      borderRadius: 20,
                      paddingLeft: 30,
                      paddingRight: 30,
                      backgroundColor: colors.tint,
                      color: colors.text,
                      fontFamily: 'Lexend',
                      fontSize: 15,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>

              <View>
                <View
                  style={{
                    backgroundColor: colors.background,
                    height: '50%',
                    marginTop: 50,
                    marginLeft: 10,
                    width: 332,
                  }}>
                  <FlatList
                    data={places}
                    keyExtractor={item => item.place_id ?? ''}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          height: 2,
                          backgroundColor: colors.separatorColor,
                          alignSelf: 'center',
                          width: '80%',
                        }}
                      />
                    )}
                    renderItem={({ item }) => (
                      <PlaceItem
                        place={item}
                        onPress={handlePlaceSelect}
                        colors={colors}
                      />
                    )}
                    style={{ margin: 10, alignSelf: 'center' }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Next Button Pressed!');
                    closeModal();
                    handleNext();
                  }}
                  style={{
                    marginTop: 60,
                    width: 332,
                    height: 77.76,
                    backgroundColor: colors.secondaryButtonColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lexend',
                      color: colors.secondaryTextColor,
                      fontWeight: '500',
                      fontSize: 27,
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
