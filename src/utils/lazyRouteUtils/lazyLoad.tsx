import React, {
  Suspense,
  lazy,
  ComponentType,
  ComponentClass,
  Component,
} from 'react';

export type TImporter = () => Promise<{ default: ComponentType }>;

interface TState {
  hasError: boolean;
}

export default function lazyLoad<Props = {}>(
  loader: TImporter,
  Loading: ComponentType
): ComponentClass<Props> {
  const LazyComponent = lazy(loader);
  return class Lazy extends Component<Props, TState> {
    public readonly state = { hasError: false };

    public static getDerivedStateFromError() {
      return { hasError: true };
    }

    public componentDidCatch(error, info) {
      console.log(error, info);
    }

    public render() {
      // const { hasError } = this.state;
      // if (hasError) {
      //   return <div>加载组件错误！</div>;
      // }
      return (
        <Suspense fallback={<Loading />}>
          <LazyComponent {...this.props} />
        </Suspense>
      );
    }
  };
}
