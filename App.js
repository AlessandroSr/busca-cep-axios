import { useState, useRef } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './src/service/api';

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpar(){
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  async function buscar(){

    if(cep == '') {
      alert('Digite um Cep Valido')
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
    }catch(error){
      console.log("Erro: "+ error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Informe o Cep desejado:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 68660000"
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={buscar}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d' }]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
            <View style={styles.resultado}>
              <Text style={styles.itemText}>Cep: { cepUser.cep }</Text>
              <Text style={styles.itemText}>Logadouro: { cepUser.logradouro }</Text>
              <Text style={styles.itemText}>Bairro: { cepUser.bairro }</Text>
              <Text style={styles.itemText}>Cidade: { cepUser.localidade }</Text>
              <Text style={styles.itemText}>Estado: { cepUser.uf }</Text>
            </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  input:{
    backgroundColor:'#fff',
    borderColor:'#ddd',
    borderWidth:1,
    borderRadius:5,
    width:'90%',
    padding:10,
    fontSize:18
  },
  text:{
    marginBottom:15,
    marginTop:25,
    fontSize:25,
    fontWeight:'bold',
  },
  areaBtn:{
    alignItems:"center",
    flexDirection:'row',
    marginTop:15,
    justifyContent:'space-between',
    paddingHorizontal:25
  },
  botao:{
    height:70,
    justifyContent:'center',
    alignItems:'center',
    padding: 15,
    borderRadius:5,
  },
  botaoText:{
    fontSize:22,
    color:'#fff'
  },
  resultado:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemText:{
    fontSize:18
  }
});
