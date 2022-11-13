import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../config/colors";
import { SPACING } from "../config/spacing";
import axios from "axios";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import Post from "../components/Post";

export default function PostScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { top } = useSafeAreaFrame();
  const [post, setPost] = useState([]);
  const [isRefreshing, setIsResfreshing] = useState(false);

  const getPost = async () => {
    try {
      const { data } = await axios.get("/post");
      setPost(data.data);
    } catch (error) {
      console.log("Error en getPost", error.message);
    }
  };

  useEffect(() => {
    isFocused && getPost();
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setIsResfreshing(true);
    await getPost();
    setIsResfreshing(false);
  }, []);

  return (
    <>
      <View style={{ ...styles.container, top: +30 }}>
        <Text style={styles.title}>Quizz</Text>
        <Text style={styles.subtitle}>Posts</Text>

        <TouchableOpacity
          style={{ ...styles.button, top }}
          onPress={() => navigation.navigate("PostActionScreen")}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["dark-gray"], colors.dark]}
          >
            <AntDesign name="addfile" color={colors.light} size={30} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Listar todos los post */}
      <FlatList
        data={post}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.light]}
            progressBackgroundColor={colors["dark-gray"]}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
    backgroundColor: "#c1a0fe",
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
    fontStyle: "italic",
  },
  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },
  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
