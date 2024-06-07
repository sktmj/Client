import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { Table, Row, Rows } from 'react-native-table-component';


const Home = () => {
  const [tableHead, setTableHead] = useState();
  const [tableData, setTableData] = useState([
    ['Present',22.5],
    ['Leave', '2', ],
    ['ONDuty', '4',],
    ['WeekOff', '2',],
    ['HollyDay', '2', ],
    ['Absent', '4', ],
  ]);
  const [entryHead,setEntryHead]=useState(["#","Date","InTime","OutTime"])

  const [entryData, setentryData] = useState([
    ['1','12/5.2024','9.00',6.30],
    ['2','12/5.2024','9.00',6.30],
    ['3','12/5.2024','9.00',6.30],
    ['4','12/5.2024','9.00',6.30],
    ['5','12/5.2024','9.00',6.30],
    ['6','12/5.2024','9.00',6.30],
    ['7','12/5.2024','9.00',6.30],
    ['8','12/5.2024','9.00',6.30],
    ['9','12/5.2024','9.00',6.30],
    ['10','12/5.2024','9.00',6.30],
    ['11','12/5.2024','9.00',6.30],
    ['12','12/5.2024','9.00',6.30],
    ['13','12/5.2024','9.00',6.30],
    ['14','12/5.2024','9.00',6.30],
    ['15','12/5.2024','9.00',6.30],
    ['16','12/5.2024','9.00',6.30],
    ['17','12/5.2024','9.00',6.30],
    ['18','12/5.2024','9.00',6.30],
    ['19','12/5.2024','9.00',6.30],
    ['20','12/5.2024','9.00',6.30],
    ['21','12/5.2024','9.00',6.30],
    ['22','12/5.2024','9.00',6.30],
    ['23','12/5.2024','9.00',6.30],
    ['24','12/5.2024','9.00',6.30],
    ['25','12/5.2024','9.00',6.30],
    ['26','12/5.2024','9.00',6.30],
    ['27','12/5.2024','9.00',6.30],
    ['28','12/5.2024','9.00',6.30],
  ]);

  const data = [
    {
      name: "WeakOff",
      population: 2,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Present",
      population:10,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Leave",
      population: 3,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Target</Text>
            <Picker style={styles.picker}>
              <Picker.Item label="Attendance" value="default" />
              <Picker.Item label="Target" value="default" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Attendance</Text>
            <Picker style={styles.picker}>
              <Picker.Item label="May-2024" value="default" />
              <Picker.Item label="June-2024" value="default" />
              <Picker.Item label="July-2024" value="default2" />
            </Picker>
          </View>
        </View>

        <PieChart
          data={data}
          width={400}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>

        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={entryHead} style={styles.head} textStyle={styles.text} />
            <Rows data={entryData} textStyle={styles.text} />
          </Table>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 20,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  tableContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 5,
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  }
});

export default Home;
