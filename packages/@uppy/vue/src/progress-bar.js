import ProgressBarPlugin from '@uppy/progress-bar'
import { shallowEqualObjects } from 'shallow-equal'

export default {
  data () {
    return {
      plugin: {},
    }
  },
  props: {
    uppy: {
      required: true,
    },
    props: {
      type: Object,
    },
  },
  mounted () {
    this.installPlugin()
  },
  methods: {
    installPlugin () {
      const uppy = this.uppy
      const options = {
        id: 'vue:ProgressBar',
        ...this.props,
        target: this.$refs.container,
      }
      uppy.use(ProgressBarPlugin, options)
      this.plugin = uppy.getPlugin(options.id)
    },
    uninstallPlugin (uppy) {
      uppy.removePlugin(this.plugin)
    },
  },
  beforeDestroy () {
    this.uninstallPlugin(this.uppy)
  },
  watch: {
    uppy (current, old) {
      if (old !== current) {
        this.uninstallPlugin(old)
        this.installPlugin()
      }
    },
    props (current, old) {
      if (!shallowEqualObjects(current, old)) {
        this.plugin.setOptions({ ...current })
      }
    },
  },
  render (createElement) {
    return createElement('div', {
      ref: 'container',
    })
  },
}
