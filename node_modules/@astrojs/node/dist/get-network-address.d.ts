interface NetworkAddressOpt {
    local: string[];
    network: string[];
}
type Protocol = 'http' | 'https';
export declare function getNetworkAddress(protocol: Protocol | undefined, hostname: string | undefined, port: number, base?: string): NetworkAddressOpt;
export {};
