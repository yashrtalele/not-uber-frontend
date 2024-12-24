import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '@/components/Header';
import { useGlobalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';

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

export default function ChooseVehicle() {
  const { colors } = useTheme();
  const snapPoints = useMemo(() => ['57%'], []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findingDriver, setFindingDriver] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 2) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);
  const { currLocLat, currLocLong, destLocLat, destLocLong } =
    useGlobalSearchParams();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

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

  useEffect(() => {
    if (currLocLat && currLocLong) {
      setCurrentLocation({
        latitude: Number(currLocLat),
        longitude: Number(currLocLong),
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
      setCurrentMarker({
        latlng: {
          latitude: Number(currLocLat),
          longitude: Number(currLocLong),
        },
        title: 'Current',
        description: 'This is the current location',
      });
    }
    if (currLocLat && currLocLong && destLocLat && destLocLong) {
      setDestinationLocation({
        latitude: Number(destLocLat),
        longitude: Number(destLocLong),
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
      setDestinationMarker({
        latlng: {
          latitude: Number(destLocLat),
          longitude: Number(destLocLong),
        },
        title: 'Destination',
        description: 'This is the destination location',
      });
    }
  }, [currLocLat, currLocLong, destLocLat, destLocLong]);

  const handleFindDriver = () => {
    setFindingDriver(!findingDriver);
  };

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const handleVehicleSelect = (vehicle: string) => {
    console.log(vehicle);
    setSelectedVehicle(vehicle);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ height: '46%' }}>
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
            <Header
              backgroundColor="transparent"
              iconBackgroundColor={colors.background}
            />
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
          enablePanDownToClose={false}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
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
            {!findingDriver ? (
              <View
                style={{
                  flex: 1,
                  width: '80%',
                  alignContent: 'center',
                }}>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      fontFamily: 'Lexend',
                      color: colors.text,
                      fontWeight: 'bold',
                      fontSize: 25,
                    }}>
                    Select Vehicle Type
                  </Text>
                </View>
                <View style={{ width: '100%', height: 63.7, marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => handleVehicleSelect('Auto')}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        padding: 3,
                        borderWidth: 1,
                        borderColor: 'transparent',
                      },
                      selectedVehicle === 'Auto' && {
                        borderColor: colors.text,
                      },
                    ]}>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: 50,
                          height: 40,
                          marginRight: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{ width: '80%', height: '80%' }}
                          source={require('../../assets/images/auto.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: colors.text,
                          }}>
                          Auto
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontSize: 16,
                            color: colors.secondaryTint,
                          }}>
                          3 mins away
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingRight: 3,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Lexend',
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: colors.text,
                        }}>
                        $8.99
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 63.7, marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => handleVehicleSelect('Car')}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: 3,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'transparent',
                      },
                      selectedVehicle === 'Car' && {
                        borderColor: colors.text,
                      },
                    ]}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: 50, height: 40, marginRight: 25 }}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={require('../../assets/images/car.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: colors.text,
                          }}>
                          Car
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontSize: 16,
                            color: colors.secondaryTint,
                          }}>
                          10 mins away
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingRight: 3,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Lexend',
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: colors.text,
                        }}>
                        $57.29
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 63.7, marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => handleVehicleSelect('SUV')}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: 3,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'transparent',
                      },
                      selectedVehicle === 'SUV' && { borderColor: colors.text },
                    ]}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: 50, height: 40, marginRight: 25 }}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={require('../../assets/images/suv.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: colors.text,
                          }}>
                          SUV
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontSize: 16,
                            color: colors.secondaryTint,
                          }}>
                          13 mins away
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingRight: 3,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Lexend',
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: colors.text,
                        }}>
                        $127.42
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 63.7, marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => handleVehicleSelect('Bike')}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        padding: 3,
                        borderWidth: 1,
                        borderColor: 'transparent',
                      },
                      selectedVehicle === 'Bike' && {
                        borderColor: colors.text,
                      },
                    ]}>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: 50,
                          height: 40,
                          marginRight: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: '90%',
                            height: '90%',
                          }}
                          source={require('../../assets/images/bike.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: colors.text,
                          }}>
                          Bike
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Lexend',
                            fontSize: 16,
                            color: colors.secondaryTint,
                          }}>
                          5 mins away
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingRight: 3,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Lexend',
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: colors.text,
                        }}>
                        $4.59
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={handleFindDriver}
                    style={{
                      marginTop: 10,
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
                      Book {selectedVehicle}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Finding Driver</Text>
                <View>
                  <TouchableOpacity
                    onPress={handleFindDriver}
                    style={{
                      marginTop: 10,
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
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
