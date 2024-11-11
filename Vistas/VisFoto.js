import React, { useState,useEffect } from 'react';
import { Image,Button,View,Text,SafeAreaView, ActivityIndicator,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../Control/Firebase';
import { getDownloadURL, uploadBytes,ref } from 'firebase/storage';


const VisFoto = ({nc}) => {
 const [image, setImage]=useState(null);
 const [isLoading, setIsLoading]= useState(false);

 /*useEffect(() => {
  const refresh = props.navigation.addListener("focus", async() => {
    setImage(null);
    setIsLoading(false);
  }, []);
  return refresh;
  }, [props]);*/ 

 const pickImage=async ()=>{
    setIsLoading(true);
    let result =await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowEditing: true,
        aspect: [4,3],
        quality:1, 

    });

      if(!result.canceled){
       // setImage(result.assets[0].uri);
        const uploadURL= await uploadImageAsync(result.assets[0].uri)
        setImage(uploadURL)
        setInterval(()=>{
          setIsLoading(false);
        },2000);
      }else{
        setImage(null);
        setInterval(()=>{
          setIsLoading(false);
        },2000);
      }
 }

 const uploadImageAsync=async(uri)=>{
    const blob =await new Promise((resolve,reject)=>{
      const xhr= new XMLHttpRequest();
      xhr.onload= function(){
        resolve(xhr.response)
      };
      xhr.onerror= function(e){
        console.log(e)
        reject(new TypeError("Error de red"))
      };
      xhr.responseType="blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    try{
      //*const storageRef=ref(storage, '/photos/image')
      //const storageRef = storage().ref(photos/Image${Date.now()});
      const storageRef = storage().ref(`photos/${nc}`);
      const result=await uploadBytes(storageRef,blob)
      blob.close()
      return await getDownloadURL(storageRef)
    }catch(error){
       console.log('Upload failed: ', error);
    }
 }

  return (
      <SafeAreaView style={{flex:1, alignItems:'center',justifyContent:'center' }}> 
        <View>
              <>
                  <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#4FC135',  padding: 10,}}
                    onPress={pickImage}  
                  >
                    {isLoading ? (
                      <View style={{alignItems:'center',justifyContent:'center'}} >
                          <ActivityIndicator style={{color: '#ff00000'}} 
                          />
                      </View>
                    ) : (
                      <View style={{alignItems:'center',justifyContent:'center' }}>
                          <Text >Seleccionar una foto...</Text>
                      </View>
                    )}
                  </TouchableOpacity>
              </>
        {!image ? (
            <View>
               <Text>No se ha seleccionado ningúna imagen</Text>
             </View>
          ) : (
          <>
              {image && (
                  <View style={{alignItems:'center',justifyContent:'center'}} >
                      <Image source={{uri:image}} style={{width:200,height:200,padding: 10}}/>
                  </View>
              )}
          </>
          )}
        </View>
      </SafeAreaView>
  );
};

export default VisFoto;