import React, { useCallback, useMemo, useRef, useState } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
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

function PlaceItem({ place, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(place)}
      style={{ paddingLeft: 30, paddingRight: 20, padding: 15 }}>
      <Text style={{ fontFamily: 'Lexend', color: '#353535' }}>
        {place.description}
      </Text>
    </TouchableOpacity>
  );
}

export default function Home() {
  const { EXPO_PUBLIC_GOOGLE_API_KEY } = process.env;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationType, setLocationType] = useState('');
  const snapPoints = useMemo(() => ['1%', '37%', '85%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 2) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const openModal = type => {
    bottomSheetRef.current?.snapToIndex(3);
    setLocationType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setLocationType('');
    setIsModalOpen(false);
  };

  const [placeDetails, setPlaceDetails] = useState([]);

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

  const [places, setPlaces] = useState([]);

  const fetchPlaces = async query => {
    try {
      const apiKey = EXPO_PUBLIC_GOOGLE_API_KEY;

      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.predictions) {
        setPlaces(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const debouncedFetchPlaces = useCallback(debounce(fetchPlaces, 1000), []);

  const fetchPlaceDetails = async (placeId: string, lType: string) => {
    try {
      const apiKey = EXPO_PUBLIC_GOOGLE_API_KEY;
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
            ...destinationLocation,
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng,
          });
        }

        setPlaceDetails(data.result);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handlePlaceSelect = details => {
    fetchPlaceDetails(details.place_id, locationType);
  };

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
            backgroundColor: '#fff',
          }}
          backgroundStyle={{ borderRadius: 40 }}
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
                  <Text style={styles.title}>
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
                    onFocus={() => openModal('current')}
                    placeholder="Add a pick-up location"
                    style={{
                      height: 50,
                      width: 270,
                      borderRadius: 20,
                      paddingLeft: 30,
                      backgroundColor: '#FAFAFA',
                    }}
                    onChangeText={debouncedFetchPlaces}
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
                    onFocus={() => openModal('destination')}
                    placeholder="Add your destination"
                    onChangeText={debouncedFetchPlaces}
                    style={{
                      height: 50,
                      width: 270,
                      borderRadius: 20,
                      paddingLeft: 30,
                      backgroundColor: '#FAFAFA',
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>

              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '50%',
                    marginTop: 50,
                    marginLeft: 10,
                    width: 332,
                  }}>
                  <FlatList
                    data={places}
                    keyExtractor={item => item.place_id}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          height: 2,
                          backgroundColor: '#eaeaea',
                          alignSelf: 'center',
                          width: '80%',
                        }}
                      />
                    )}
                    renderItem={({ item }) => (
                      <PlaceItem place={item} onPress={handlePlaceSelect} />
                    )}
                    style={{ margin: 10, alignSelf: 'center' }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Next Button Pressed!');
                    closeModal();
                  }}
                  style={{
                    marginTop: 60,
                    width: 332,
                    height: 77.76,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lexend',
                      color: 'white',
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
