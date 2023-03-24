import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';


export default function Groups() {

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group});
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight 
      title='Turmas'
      subtitle='jogue com sua turma!'
      />


        {
          isLoading ? <Loading/> :
          
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({item}) => (
            <GroupCard 
            title={item}
            onPress={() => handleOpenGroup(item)}
            />)}
            ListEmptyComponent={() => (<ListEmpty message="Bora cadastrar a primeira turma?"/>)}
            showsVerticalScrollIndicator={false}
          />
        }
      <Button title='Criar nova Turma' onPress={handleNewGroup}/>
    </Container>
  );
}
