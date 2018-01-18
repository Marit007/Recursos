/**
 * Module dependencies
 */
const React = require('react');
const Head = require('react-declarative-head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');

/**
 * DemoView Component
 */
class DemoView extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert('Click using React!');
  }

  render() {
    const { site, siteId, lowEnd, deviceType, company } = this.props;
    return (
      <div className="demo">
        <Head>
          <title>Demo Page</title>
        </Head>

        <Style href="demo.css" />
        <Script src="demo.js" />
        <button onClick={this.handleClick}>Click Me!</button>

	<p>
		Donec euismod elit at dui faucibus imperdiet. Vivamus blandit bibendum ante, non rutrum velit facilisis et. Nam condimentum ac orci eu tempus. Mauris id nulla et lacus tincidunt porta. Integer risus arcu, sagittis id mattis quis, iaculis nec turpis. Pellentesque in tincidunt lacus. Pellentesque ultricies fermentum aliquam. Cras elementum arcu ac nisi dictum faucibus. Vivamus nec tempus orci, sit amet aliquam nunc. Sed a sem nulla. Sed facilisis egestas enim in imperdiet. Aenean rhoncus neque in blandit vestibulum.
	</p>

	<p>
		Nam in sagittis urna. Cras et velit id ipsum ornare congue nec nec ligula. Vestibulum vehicula sem vel nisi feugiat bibendum. Pellentesque posuere turpis sit amet ligula ultrices, at vulputate tellus pharetra. Duis non magna nec urna tincidunt pulvinar in luctus diam. Maecenas ut vehicula nibh, in condimentum lacus. Ut luctus leo id pulvinar mattis. Integer vel accumsan risus. Donec ut eros eu ligula consectetur gravida mollis eget ante.
	</p>

	<p>
		Aliquam et turpis non eros hendrerit ullamcorper. Proin luctus justo sit amet odio fermentum maximus. Aliquam eleifend turpis posuere, elementum magna suscipit, rhoncus lacus. Donec ut eleifend sapien, id aliquam ex. Nulla viverra, lectus eu fermentum viverra, nulla ligula congue felis, quis cursus tortor sapien nec nulla. Maecenas eu magna vel metus molestie volutpat. Quisque bibendum, leo eu sagittis placerat, ipsum turpis viverra metus, eget mollis diam libero non dui. Integer sed eros sit amet enim viverra semper ac vel eros. Nullam dignissim, lacus eget scelerisque semper, felis mauris lacinia nulla, sed condimentum ex lorem vitae risus. Pellentesque elementum lacus lectus, vel pharetra dui tincidunt et. Cras tincidunt sapien ut felis accumsan, sed elementum eros lobortis. Nulla tempus elementum velit eget vulputate. Vivamus fermentum diam vitae purus egestas euismod. Nunc eu lacus mi.
	</p>

	<p>
		Praesent dapibus elit et magna imperdiet, eu rutrum felis consectetur. Mauris rutrum finibus lectus eget efficitur. Cras mi nibh, tincidunt vel aliquet et, molestie a ex. Aliquam sit amet augue lobortis quam pretium scelerisque. Curabitur sagittis sollicitudin tristique. Curabitur gravida urna ultrices neque finibus commodo. Curabitur euismod turpis tellus, eu consequat justo euismod ac.
	</p>

	<p>
		Morbi tempor, libero nec condimentum convallis, nunc justo viverra tellus, sit amet lacinia libero quam sed odio. Nullam turpis enim, fringilla eu condimentum a, scelerisque et velit. Nullam ac dui lacus. In ut purus eu turpis sagittis commodo quis ut ipsum. Sed eu ipsum sed nisi efficitur gravida sit amet id lectus. Maecenas accumsan ullamcorper magna, sed dapibus orci pellentesque quis. Donec lacinia dapibus mollis. Nam pharetra pulvinar dolor a faucibus. Integer non risus sed orci ullamcorper consectetur. Vestibulum sed nunc eu nunc tristique vehicula eu pellentesque mauris. Maecenas dictum elementum arcu, ut ullamcorper neque ultrices ut. Proin diam dui, porttitor eget nisl eget, semper bibendum orci. Cras id enim tortor. Proin accumsan ornare nunc posuere laoreet.
	</p>

	<p>
		Vestibulum ullamcorper turpis in quam scelerisque aliquet. Pellentesque rutrum nisl ac massa lobortis, vitae facilisis tortor iaculis. Nunc in erat pellentesque, luctus nunc vitae, efficitur arcu. Cras nunc tellus, elementum volutpat vulputate id, pulvinar congue urna. Praesent ac aliquet odio. Nunc sed commodo augue. Pellentesque sed faucibus elit, sit amet venenatis lectus. Nam mattis, orci ac faucibus molestie, lorem nulla rutrum leo, eu gravida turpis nisi in arcu. Ut arcu libero, elementum fermentum venenatis auctor, ornare vel massa. Fusce eleifend, purus eget ultrices accumsan, massa nisl venenatis dui, at mattis metus lacus in neque. Morbi dictum nisi id pharetra blandit.
	</p>

	<p>
		Sed quis felis magna. Donec vitae enim sit amet mauris aliquet lobortis. Aenean urna felis, vestibulum vel tristique non, sollicitudin sollicitudin dolor. Aenean pharetra tristique dui non pellentesque. Ut et tincidunt neque. Aenean nulla justo, vehicula vel nisl at, rhoncus egestas turpis. Aenean maximus ex sit amet luctus pretium. Vestibulum vitae sagittis ante. Quisque tempus faucibus felis at consectetur. Vestibulum luctus sem quis massa pharetra aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</p>

	<p>
		Suspendisse metus orci, suscipit vestibulum viverra non, mollis sit amet tellus. Aenean volutpat ante nec elit varius tincidunt. Donec at accumsan tellus. Suspendisse ultrices eros sed cursus euismod. Proin facilisis enim eget libero finibus convallis. Donec quis dui sed erat rutrum facilisis. In venenatis pretium arcu sit amet ullamcorper. Integer et libero urna. Nulla facilisi. Donec vitae aliquam est, eget dictum turpis. Proin molestie consequat rhoncus.
	</p>

	<p>
		Aliquam facilisis, augue vitae pharetra consectetur, eros dolor placerat ipsum, ut consequat leo lacus nec justo. Maecenas tempus iaculis erat. Sed lobortis nisi sagittis, tempor quam vitae, fringilla tellus. Morbi a gravida libero. Aliquam quis lacus sit amet dolor blandit efficitur. Cras metus orci, sollicitudin a lacinia semper, efficitur ac sem. Nullam aliquet viverra justo ut placerat. Proin convallis est eget dolor ultrices, non elementum ligula blandit. Sed vel fringilla eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vestibulum arcu eu diam luctus accumsan. Sed gravida lectus semper ex fringilla maximus. Nam gravida mauris eget ante euismod, id ornare mauris pharetra. Etiam egestas diam non elementum pretium. Ut pretium, nisi sit amet elementum pretium, ipsum nulla scelerisque erat, ullamcorper pellentesque nulla massa vel odio.
	</p>

	<p>
		Aliquam vulputate mattis purus, sed vestibulum tortor lacinia non. Nulla efficitur, risus id varius sollicitudin, enim felis tempus tellus, id condimentum urna lacus ut odio. Nullam blandit eros ac tempus scelerisque. Phasellus sagittis at eros non tempor. Vestibulum elementum viverra metus. Maecenas consectetur risus eget ligula ultricies porttitor sit amet ut tortor. Sed id mi ut ligula dapibus laoreet.
	</p>

	<h2>Another demo content</h2>

	<p>
		Donec euismod elit at dui faucibus imperdiet. Vivamus blandit bibendum ante, non rutrum velit facilisis et. Nam condimentum ac orci eu tempus. Mauris id nulla et lacus tincidunt porta. Integer risus arcu, sagittis id mattis quis, iaculis nec turpis. Pellentesque in tincidunt lacus. Pellentesque ultricies fermentum aliquam. Cras elementum arcu ac nisi dictum faucibus. Vivamus nec tempus orci, sit amet aliquam nunc. Sed a sem nulla. Sed facilisis egestas enim in imperdiet. Aenean rhoncus neque in blandit vestibulum.
	</p>

	<p>
		Nam in sagittis urna. Cras et velit id ipsum ornare congue nec nec ligula. Vestibulum vehicula sem vel nisi feugiat bibendum. Pellentesque posuere turpis sit amet ligula ultrices, at vulputate tellus pharetra. Duis non magna nec urna tincidunt pulvinar in luctus diam. Maecenas ut vehicula nibh, in condimentum lacus. Ut luctus leo id pulvinar mattis. Integer vel accumsan risus. Donec ut eros eu ligula consectetur gravida mollis eget ante.
	</p>

	<p>
		Aliquam et turpis non eros hendrerit ullamcorper. Proin luctus justo sit amet odio fermentum maximus. Aliquam eleifend turpis posuere, elementum magna suscipit, rhoncus lacus. Donec ut eleifend sapien, id aliquam ex. Nulla viverra, lectus eu fermentum viverra, nulla ligula congue felis, quis cursus tortor sapien nec nulla. Maecenas eu magna vel metus molestie volutpat. Quisque bibendum, leo eu sagittis placerat, ipsum turpis viverra metus, eget mollis diam libero non dui. Integer sed eros sit amet enim viverra semper ac vel eros. Nullam dignissim, lacus eget scelerisque semper, felis mauris lacinia nulla, sed condimentum ex lorem vitae risus. Pellentesque elementum lacus lectus, vel pharetra dui tincidunt et. Cras tincidunt sapien ut felis accumsan, sed elementum eros lobortis. Nulla tempus elementum velit eget vulputate. Vivamus fermentum diam vitae purus egestas euismod. Nunc eu lacus mi.
	</p>

	<p>
		Praesent dapibus elit et magna imperdiet, eu rutrum felis consectetur. Mauris rutrum finibus lectus eget efficitur. Cras mi nibh, tincidunt vel aliquet et, molestie a ex. Aliquam sit amet augue lobortis quam pretium scelerisque. Curabitur sagittis sollicitudin tristique. Curabitur gravida urna ultrices neque finibus commodo. Curabitur euismod turpis tellus, eu consequat justo euismod ac.
	</p>

	<p>
		Morbi tempor, libero nec condimentum convallis, nunc justo viverra tellus, sit amet lacinia libero quam sed odio. Nullam turpis enim, fringilla eu condimentum a, scelerisque et velit. Nullam ac dui lacus. In ut purus eu turpis sagittis commodo quis ut ipsum. Sed eu ipsum sed nisi efficitur gravida sit amet id lectus. Maecenas accumsan ullamcorper magna, sed dapibus orci pellentesque quis. Donec lacinia dapibus mollis. Nam pharetra pulvinar dolor a faucibus. Integer non risus sed orci ullamcorper consectetur. Vestibulum sed nunc eu nunc tristique vehicula eu pellentesque mauris. Maecenas dictum elementum arcu, ut ullamcorper neque ultrices ut. Proin diam dui, porttitor eget nisl eget, semper bibendum orci. Cras id enim tortor. Proin accumsan ornare nunc posuere laoreet.
	</p>

	<p>
		Vestibulum ullamcorper turpis in quam scelerisque aliquet. Pellentesque rutrum nisl ac massa lobortis, vitae facilisis tortor iaculis. Nunc in erat pellentesque, luctus nunc vitae, efficitur arcu. Cras nunc tellus, elementum volutpat vulputate id, pulvinar congue urna. Praesent ac aliquet odio. Nunc sed commodo augue. Pellentesque sed faucibus elit, sit amet venenatis lectus. Nam mattis, orci ac faucibus molestie, lorem nulla rutrum leo, eu gravida turpis nisi in arcu. Ut arcu libero, elementum fermentum venenatis auctor, ornare vel massa. Fusce eleifend, purus eget ultrices accumsan, massa nisl venenatis dui, at mattis metus lacus in neque. Morbi dictum nisi id pharetra blandit.
	</p>

	<p>
		Sed quis felis magna. Donec vitae enim sit amet mauris aliquet lobortis. Aenean urna felis, vestibulum vel tristique non, sollicitudin sollicitudin dolor. Aenean pharetra tristique dui non pellentesque. Ut et tincidunt neque. Aenean nulla justo, vehicula vel nisl at, rhoncus egestas turpis. Aenean maximus ex sit amet luctus pretium. Vestibulum vitae sagittis ante. Quisque tempus faucibus felis at consectetur. Vestibulum luctus sem quis massa pharetra aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</p>

	<p>
		Suspendisse metus orci, suscipit vestibulum viverra non, mollis sit amet tellus. Aenean volutpat ante nec elit varius tincidunt. Donec at accumsan tellus. Suspendisse ultrices eros sed cursus euismod. Proin facilisis enim eget libero finibus convallis. Donec quis dui sed erat rutrum facilisis. In venenatis pretium arcu sit amet ullamcorper. Integer et libero urna. Nulla facilisi. Donec vitae aliquam est, eget dictum turpis. Proin molestie consequat rhoncus.
	</p>

	<p>
		Aliquam facilisis, augue vitae pharetra consectetur, eros dolor placerat ipsum, ut consequat leo lacus nec justo. Maecenas tempus iaculis erat. Sed lobortis nisi sagittis, tempor quam vitae, fringilla tellus. Morbi a gravida libero. Aliquam quis lacus sit amet dolor blandit efficitur. Cras metus orci, sollicitudin a lacinia semper, efficitur ac sem. Nullam aliquet viverra justo ut placerat. Proin convallis est eget dolor ultrices, non elementum ligula blandit. Sed vel fringilla eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vestibulum arcu eu diam luctus accumsan. Sed gravida lectus semper ex fringilla maximus. Nam gravida mauris eget ante euismod, id ornare mauris pharetra. Etiam egestas diam non elementum pretium. Ut pretium, nisi sit amet elementum pretium, ipsum nulla scelerisque erat, ullamcorper pellentesque nulla massa vel odio.
	</p>

	<p>
		Aliquam vulputate mattis purus, sed vestibulum tortor lacinia non. Nulla efficitur, risus id varius sollicitudin, enim felis tempus tellus, id condimentum urna lacus ut odio. Nullam blandit eros ac tempus scelerisque. Phasellus sagittis at eros non tempor. Vestibulum elementum viverra metus. Maecenas consectetur risus eget ligula ultricies porttitor sit amet ut tortor. Sed id mi ut ligula dapibus laoreet.
	</p>

      </div>
    );
  }
}

/**
 * Expose DemoView.
 */
module.exports = DemoView;
