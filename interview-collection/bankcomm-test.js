function intersect(nums1, nums2) {
  const numCount1 = countElements(nums1)
  const numCount2 = countElements(nums2)
  const intersection = []

  for (const num in numCount1) {
    if (numCount2.hasOwnProperty(num)) {
      const count = Math.min(numCount1[num], numCount2[num])
      for (let i = 0; i < count; i++) {
        intersection.push(parseInt(num))
      }
    }
  }

  return intersection
}

function countElements(nums) {
  const count = {}
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1
  }
  return count
}

// 示例用法
const nums1 = [4, 9, 5, 9]
const nums2 = [9, 4, 9, 8, 4]
const result = intersect(nums1, nums2)
console.log(result)
