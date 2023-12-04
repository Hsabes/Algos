// Combine Two HashMaps

// We have two HashMaps with Strings as the keys and Integers as the values. 
// Our task is to combine both of these HashMaps into one HashMap. 
// Reminder: HashMaps do not allow duplicate keys. So in this problem, we will be summing the values of duplicate keys.

import java.util.HashMap;
import java.util.Map;
// import java.util.Arrays;

// Imports: HashMap, Map, Arrays

class CombineHashMaps {
    public static void main(String[] args) {
        Map<String, Integer> map1 = new HashMap<>();
            map1.put("A", 7);
            map1.put("B", 6);
            map1.put("C", 5);
        Map<String, Integer> map2 = new HashMap<>();
            map2.put("A", 8);
            map2.put("B", 9);
            map2.put("C", 10);
            map2.put("D", 10);
        System.out.println(combineHashMaps(map1, map2));
    }

    public static Map<String, Integer> combineHashMaps(Map<String, Integer> map1, Map<String, Integer> map2){
        Map <String, Integer> resultMap = new HashMap<>(map2);
        for (Map.Entry<String, Integer> entrySet : map1.entrySet()){
            resultMap.computeIfPresent(entrySet.getKey(), (key, value) -> value + entrySet.getValue());
            if (!resultMap.containsKey(entrySet.getKey())){
                resultMap.put(entrySet.getKey(), entrySet.getValue());
            }
        }
        return resultMap;
    }

}

// ================================================================================================
// ************************************************************************************************
// ================================================================================================