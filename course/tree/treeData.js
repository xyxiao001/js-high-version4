const treeData = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
      left: null,
      right: null
    },
    right: {
      val: 'F',
      left: {
        val: 'E',
        left: null,
        right: null
      },
      right: null
    }
  },
  right: {
    val: 'C',
    left: {
      val: 'G',
      left: null,
      right: {
        val: 'H',
        left: null,
        right: null
      }
    },
    right: {
      val: 'I',
      left: null,
      right: null
    }
  }
}

module.exports.treeData = treeData