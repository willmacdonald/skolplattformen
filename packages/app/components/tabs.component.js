import React from 'react'
import { StyleSheet } from 'react-native';
import { TabBar, Tab, TabView, Layout, Text, Icon } from '@ui-kitten/components'
import { NewsList } from './newsList.component'
import { Calendar } from './calendar.component'
import { Classmates } from './classmates.component'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment'

export const AppNavigator = ({child}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const NewsIcon = (props) => (
    <Icon {...props} name='activity-outline'/>
  )
  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar-outline'/>
  )

  const ClassIcon = (props) => (
    <Icon {...props} name='people-outline'/>
  )

  const SettingsIcon = (props) => (
    <Icon {...props} name='options-2-outline'/>
  )
  
  return (
    <SafeAreaView>
      <TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
        <Tab title="Nyheter" icon={NewsIcon}>
          <Layout style={styles.tabContainer}>
            <NewsList news={child.news} />
          </Layout>
        </Tab>
        <Tab title="Schema" icon={CalendarIcon}>
          <Layout style={styles.tabContainer}>
            <Calendar calendar={[...child.calendar, ...child.schedule].filter(a => moment(a.startDate).isAfter(moment().startOf('day')) ) }></Calendar>
          </Layout>
        </Tab>
        <Tab title="Klassen" icon={ClassIcon}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>
              Klass {child.classmates.length ? child.classmates[0].className : ''}
            </Text>
            <Classmates classmates={child.classmates}/>
          </Layout>
        </Tab>
        <Tab title="Inställningar" icon={SettingsIcon}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>
              Inställningar
            </Text>
          </Layout>
        </Tab>
      </TabView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingLeft: 10,
    flexDirection: 'column'
  },
})